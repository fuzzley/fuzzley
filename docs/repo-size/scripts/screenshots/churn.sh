#!/usr/bin/env bash
# Lists every commit on main that brought a new site image into history (any
# image outside the committed game builds), with what those blobs added, at
# full size and as git packs them on their own.
#
#   churn.sh [git-dir]    the mirror, unless given
#
# Writes data/screenshots/churn.tsv.
set -euo pipefail
. "$(dirname "$0")/../history/env.sh"
dir=${1:-$MIRROR}
out=$REPO/docs/repo-size/data/screenshots/churn.tsv
images='\.(png|jpe?g|webp|avif|gif|svg|ico|pdf)$'
printf 'commit\tdate\timages added\traw KiB\tpacked KiB\tsubject\n' > "$out"
git -C "$dir" rev-list --reverse refs/heads/main | while read -r c; do
  # The blobs this commit brings into history, none of its ancestors having
  # them, at image paths outside the game builds. A file moved or copied
  # adds nothing.
  blobs=$(git -C "$dir" rev-list --objects "$c" --not $(git -C "$dir" rev-parse "$c^@" 2>/dev/null) |
    awk -v re="$images" -v gb="$GAME_BUILDS" 'NF > 1 && tolower($2) ~ re && $2 !~ gb { print $1 }' |
    git -C "$dir" cat-file --batch-check='%(objecttype) %(objectname)' | awk '$1 == "blob" { print $2 }')
  [ -n "$blobs" ] || continue
  n=$(printf '%s\n' "$blobs" | wc -l)
  raw=$(printf '%s\n' "$blobs" | git -C "$dir" cat-file --batch-check='%(objectsize)' | awk '{ s += $1 } END { print s }')
  # Packed as git would send them, deltas against the parent's objects allowed.
  packed=$(printf '%s\n' "$blobs" | git -C "$dir" pack-objects --stdout -q --window=250 --depth=50 | wc -c)
  printf '%s\t%s\t%s\t%.1f\t%.1f\t%s\n' "${c:0:7}" "$(git -C "$dir" log -1 --format=%cs "$c")" "$n" \
    "$(awk -v r="$raw" 'BEGIN { print r / 1024 }')" "$(awk -v p="$packed" 'BEGIN { print p / 1024 }')" \
    "$(git -C "$dir" log -1 --format=%s "$c" | cut -c1-90)" >> "$out"
done
awk -F'\t' 'NR > 1 { n++; r += $4; p += $5 } END { printf "total\t\t%d commits\t%.1f\t%.1f\t\n", n, r, p }' "$out" >> "$out"
column -t -s$'\t' "$out"
