#!/usr/bin/env bash
# Rehearses the runbook's backup and rollback without a push: bundles the
# untouched mirror, verifies the bundle, restores a mirror from it and
# compares every ref, then rolls a copy of a rewritten mirror back from the
# bundle (by fetch, standing in for the force-push) and checks main is the
# old commit again. Adapted from fuzzley-games' 11-backup-rehearsal.sh at
# 92f00d6b, for main alone.
#
#   10-backup-rehearsal.sh [scenario]   r3 by default
#
# Needs 01-mirror.sh and 03-scenario.sh <scenario> first. Writes
# data/history/backup-rehearsal.txt.
set -euo pipefail
. "$(dirname "$0")/env.sh"
name=${1:-r3}
bundle=$WORK/fuzzley-pre-rewrite.bundle
out=$DATA/backup-rehearsal.txt
{
  start=$(now)
  git -C "$MIRROR" bundle create --quiet "$bundle" --all
  echo "bundle: $(du -m "$bundle" | cut -f1) MiB, $(git bundle list-heads "$bundle" | wc -l) refs, made in $(elapsed "$start" "$(now)") s"
  git bundle verify --quiet "$bundle" && echo "bundle verify: ok"

  restored=$WORK/restored-from-bundle.git
  rm -rf "$restored"
  git clone --quiet --mirror "$bundle" "$restored"
  git -C "$restored" remote set-url --push origin DISABLED
  if diff <(git -C "$MIRROR" for-each-ref --format='%(objectname) %(refname)') \
    <(git -C "$restored" for-each-ref --format='%(objectname) %(refname)') > /dev/null; then
    echo "refs of the mirror restored from the bundle: identical to the original's"
  else
    echo "refs of the mirror restored from the bundle: DIFFERENT"
  fi
  git -C "$restored" fsck --no-progress > /dev/null 2>&1 && echo "fsck of the restored mirror: ok"

  # A copy of the rewritten mirror stands for GitHub after the push; rolling
  # back moves its branches to the old commits again.
  server=$WORK/$name-rollback.git
  rm -rf "$server"
  cp -a "$WORK/$name.git" "$server"
  git -C "$server" remote set-url --push origin DISABLED
  echo "before rollback, main: $(git -C "$server" rev-parse refs/heads/main)"
  git -C "$server" fetch --quiet --no-tags "$bundle" '+refs/heads/main:refs/heads/main'
  for ref in refs/heads/main; do
    if [ "$(git -C "$server" rev-parse "$ref")" = "$(git -C "$MIRROR" rev-parse "$ref")" ]; then
      echo "after rollback, $ref: the old commit again, $(git -C "$server" rev-parse --short=8 "$ref")"
    else
      echo "after rollback, $ref: NOT the old commit"
    fi
  done
  rm -rf "$server" "$restored"
} | tee "$out"
