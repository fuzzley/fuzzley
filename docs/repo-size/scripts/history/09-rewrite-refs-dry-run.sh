#!/usr/bin/env bash
# Dry-runs the rewrite of the commit hashes that name fuzzley commits, on
# copies, never the files themselves: docs/ as the rewritten main has it,
# fuzzley-games' docs/ at its clone's HEAD, and the memory notes. Then scans
# the copies again to count what still names an old commit and what now
# names a new one.
#
#   09-rewrite-refs-dry-run.sh <scenario>
#
# Last, a dry run on this worktree's docs/repo-size/ as it is.
#
# Adapted from fuzzley-games' 09-rewrite-refs-dry-run.sh at 92f00d6b: the
# other repository is fuzzley-games (OTHER), whose docs name fuzzley commits
# too. Needs 03-scenario.sh <scenario> first. Writes
# data/history/rewrite-refs-<scenario>.txt.
set -euo pipefail
. "$(dirname "$0")/env.sh"
name=$1
new=$WORK/$name.git
MEMORY=${MEMORY:-$HOME/.claude/projects/-home-dev-Projects-personal/memory}
dir=$WORK/rewrite-dry-run-$name
rm -rf "$dir"
mkdir -p "$dir/repo" "$dir/memory" "$dir/fuzzley-games"
git -C "$new" archive refs/heads/main docs | tar -x -C "$dir/repo"
cp "$MEMORY"/*.md "$dir/memory/"
git -C "$OTHER" archive HEAD docs | tar -x -C "$dir/fuzzley-games"
cp -a "$dir" "$dir.before"
out=$DATA/rewrite-refs-$name.txt
node "$(dirname "$0")/rewrite-refs.mjs" --map "$new/filter-repo/commit-map" --old "$MIRROR" --new "$new" \
  --other "$OTHER" --write "$dir/repo/docs" "$dir/memory" "$dir/fuzzley-games/docs" > "$out"
{
  echo
  echo "== the copies afterwards"
  echo "changed lines (diff -r, - and + each): $(diff -r "$dir.before" "$dir" | grep -c '^[<>]' || true)"
  # Run again on the rewritten copies: what is left to rewrite now.
  node "$(dirname "$0")/rewrite-refs.mjs" --map "$new/filter-repo/commit-map" --old "$MIRROR" --new "$new" \
    --other "$OTHER" "$dir/repo/docs" "$dir/memory" "$dir/fuzzley-games/docs" | grep -E '^(replacements|commits in old|rewritten)' | sed 's/^/second pass: /'

  # With filter-repo's default pruning these commits would vanish, and the
  # map would give each 0000000: what names them by hash today?
  echo
  echo "== references to the commits default pruning would drop"
  while read -r c; do
    [ -n "$c" ] || continue
    n=$(grep -rhoE "\b${c::7}[0-9a-f]{0,33}\b" "$dir.before" | grep -c . || true)
    echo "${c::8} $(git -C "$MIRROR" log -1 --format=%cs "$c"): $n references in the copies of docs/, fuzzley-games' docs/ and the memory notes"
  done < "$WORK/logs/$name-auto-pruned.txt"

  # This plan's own folder, as the worktree has it now (other plans' files
  # in it are still being written), without what records the old history on
  # purpose: a dry run only.
  echo
  echo "== this worktree's docs/repo-size/, at $(date -u +%FT%TZ), a dry run"
  node "$(dirname "$0")/rewrite-refs.mjs" --map "$new/filter-repo/commit-map" --old "$MIRROR" --new "$new" \
    --other "$OTHER" --exclude "$REPO/docs/repo-size/data/history" \
    --exclude "$REPO/docs/repo-size/research/history-rewrite.md" "$REPO/docs/repo-size" |
    grep -E '^(files read|excluded|replacements|commits in old|ambiguous|rewritten)'
} >> "$out"
cat "$out"
