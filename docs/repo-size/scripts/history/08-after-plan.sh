#!/usr/bin/env bash
# Dry-runs the whole plan on a copy: Part A's commit on top of r3's rewritten
# main (each screenshot as lossless WebP no wider than the widest picture the
# site asks of it), then Part B's rule run again, which strips the versions
# that commit replaced. Measures the result as 03-scenario.sh does.
#
#   08-after-plan.sh <frontend-dir>
#
# <frontend-dir> is a checkout's frontend/ with node_modules, for sharp.
# Needs 03-scenario.sh r3 first. Writes data/history/after-plan.txt.
set -euo pipefail
. "$(dirname "$0")/env.sh"
frontend=$1
fit=$(cd "$(dirname "$0")/../screenshots" && pwd)/fit.mjs
work=$WORK/after-plan-work
rm -rf "$work" "$WORK/after-plan.git"
git clone --quiet "$WORK/r3.git" "$work"
git -C "$work" remote set-url --push origin DISABLED
assets=$work/frontend/src/assets/projects
content=$work/frontend/src/content/projects
{
  echo "Part A, as dry-run on r3's main ($(git -C "$work" rev-parse --short HEAD)):"
  for f in "$assets"/*; do
    name=$(basename "$f")
    stem=${name%.*}
    # The plan's caps (§5): a gallery image at 1200 px at most, a cover at 1600.
    if grep -q "image: ../../assets/projects/$name" "$content"/*.md; then width=1200; else width=1600; fi
    tmp=$WORK/fit-$stem.webp
    node "$fit" "$frontend" "$width" "$f" "$tmp" | sed "s#^$WORK/fit-#  #"
    rm "$f"
    mv "$tmp" "$assets/$stem.webp"
    sed -i "s#assets/projects/$name#assets/projects/$stem.webp#" "$content"/*.md
  done
} > "$DATA/after-plan.txt"
git -C "$work" add -A frontend/src
git -C "$work" -c user.name=dry-run -c user.email=dry-run@invalid commit --quiet -m "dry run: the screenshots as Part A commits them"
git -C "$work" diff --stat HEAD~1 HEAD | tail -1 >> "$DATA/after-plan.txt"
printf '%s\n' HEAD ^HEAD~1 | git -C "$work" pack-objects --revs --stdout -q | wc -c |
  awk '{ printf "Part A adds %.2f MiB packed\n", $1 / 1048576 }' >> "$DATA/after-plan.txt"

# Part B's rule on the day: every site image blob main's tip no longer holds.
git clone --quiet --mirror "$work" "$WORK/after-plan.git"
dest=$WORK/after-plan.git
git -C "$dest" remote set-url --push origin DISABLED
guard_push "$dest"
git -C "$dest" ls-tree -r --format='%(objectname)' refs/heads/main | sort -u > "$WORK/after-plan-tip.txt"
git -C "$dest" rev-list --objects --all |
  awk 'NF > 1 && tolower($2) ~ /\.(png|jpe?g|webp|avif|gif|svg|ico|pdf)$/ { print $1 }' | sort -u |
  comm -23 - "$WORK/after-plan-tip.txt" > "$WORK/after-plan-strip-ids.txt"
echo "Part B strips $(wc -l < "$WORK/after-plan-strip-ids.txt") more image blobs" >> "$DATA/after-plan.txt"
(cd "$dest" && "$FILTER_REPO" --force --quiet --prune-empty never --prune-degenerate never \
  --strip-blobs-with-ids "$WORK/after-plan-strip-ids.txt") > /dev/null 2>&1
gc_tight "$dest"
git -C "$dest" fsck --full --no-progress > /dev/null 2>&1 && fsck=ok || fsck=failed
size_kib=$(git -C "$dest" count-objects -v | awk '/^size-pack:/ { print $2 }')
images_kib=$(git -C "$dest" ls-tree -r -l refs/heads/main | awk 'tolower($5) ~ /\.(png|jpe?g|webp|avif|gif|svg|ico|pdf)$/ { s += $4 } END { print s / 1024 }')
{
  echo "fsck: $fsck"
  echo "commits on main: $(git -C "$dest" rev-list --count refs/heads/main)"
  awk -v s="$size_kib" 'BEGIN { printf "after A and B, size-pack: %.2f MiB\n", s / 1024 }'
  awk -v s="$images_kib" 'BEGIN { printf "of which images at main'\''s tip: %.2f MiB at full size\n", s / 1024 }'
} >> "$DATA/after-plan.txt"
rm -rf "$work" "$WORK"/fit-*.webp
cat "$DATA/after-plan.txt"
