#!/usr/bin/env bash
# Estimates GitHub's figure after the rewrite is pushed: the rewritten
# history, with the old refs/pull/* that GitHub keeps read-only, repacked as
# the scenarios are.
#
#   07-github-after-push.sh <scenario>
#
# Needs 03-scenario.sh <scenario> first. Writes a row of
# data/history/github-after-push.tsv.
set -euo pipefail
. "$(dirname "$0")/env.sh"
name=$1
dest=$WORK/$name-github.git
rm -rf "$dest"
cp -a "$WORK/$name.git" "$dest"
git -C "$dest" remote set-url --push origin DISABLED
guard_push "$dest"
git -C "$dest" for-each-ref --format='delete %(refname)' refs/pull | git -C "$dest" update-ref --stdin
git -C "$dest" fetch --quiet "$MIRROR" '+refs/pull/*:refs/pull/*'
gc_tight "$dest"
size_kib=$(git -C "$dest" count-objects -v | awk '/^size-pack:/ { print $2 }')
old_only=$(git -C "$dest" rev-list --count --glob=refs/pull --not refs/heads/main)
tsv=$DATA/github-after-push.tsv
[ -f "$tsv" ] || printf 'scenario\tsize-pack MiB\told commits only refs/pull/* reach\n' > "$tsv"
awk -F'\t' -v n="$name" '$1 != n' "$tsv" > "$tsv.tmp"
awk -v n="$name" -v s="$size_kib" -v o="$old_only" 'BEGIN { printf "%s\t%.1f\t%d\n", n, s / 1024, o }' >> "$tsv.tmp"
mv "$tsv.tmp" "$tsv"
rm -rf "$dest"
cat "$tsv"
