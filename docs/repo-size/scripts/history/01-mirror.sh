#!/usr/bin/env bash
# Clones a fresh mirror of the repository, disables its push URL, counts its
# refs by kind, then repacks a copy of it as the scenarios are and measures
# it: the baseline the scenarios compare with.
#
#   01-mirror.sh          clones only if the mirror is missing
#   01-mirror.sh fresh    clones again
#
# Writes data/history/refs.tsv, refs-by-kind.tsv,
# mirror-as-cloned-count-objects.txt and baseline.tsv.
set -euo pipefail
. "$(dirname "$0")/env.sh"

if [ "${1:-}" = fresh ] || [ ! -d "$MIRROR" ]; then
  rm -rf "$MIRROR"
  start=$(now)
  git clone --quiet --mirror "$URL" "$MIRROR"
  echo "cloned in $(elapsed "$start" "$(now)") s"
fi
git -C "$MIRROR" remote set-url --push origin DISABLED
guard_push "$MIRROR"

# Every ref, its kind, and the commit it names.
git -C "$MIRROR" for-each-ref --format='%(refname)%09%(objectname)%09%(objecttype)' |
  awk -F'\t' 'BEGIN { OFS = "\t"; print "kind", "ref", "object", "type" }
  {
    kind = "other"
    if ($1 ~ /^refs\/pull\/[0-9]+\/head$/) kind = "pull-head"
    else if ($1 ~ /^refs\/pull\/[0-9]+\/merge$/) kind = "pull-merge"
    else if ($1 == "refs/heads/main") kind = "branch-main"
    else if ($1 ~ /^refs\/heads\//) kind = "branch-other"
    else if ($1 ~ /^refs\/tags\//) kind = "tag"
    print kind, $1, $2, $3
  }' > "$DATA/refs.tsv"

{
  printf 'kind\tcount\tin a normal clone\n'
  tail -n +2 "$DATA/refs.tsv" | cut -f1 | sort | uniq -c |
    awk '{
      clone = "yes, as refs/remotes/origin/*"
      if ($2 ~ /^pull-/) clone = "no: only a mirror or an explicit refspec fetches refs/pull/*"
      if ($2 == "tag") clone = "yes"
      printf "%s\t%s\t%s\n", $2, $1, clone
    }'
  printf 'total\t%s\t\n' "$(($(wc -l < "$DATA/refs.tsv") - 1))"
} > "$DATA/refs-by-kind.tsv"
cat "$DATA/refs-by-kind.tsv"

# The mirror as GitHub sent it, before any repack.
git -C "$MIRROR" count-objects -vH > "$DATA/mirror-as-cloned-count-objects.txt"

# The baseline: the untouched mirror, repacked as each scenario is.
base=$(copy_mirror baseline)
gc_tight "$base"
size_kib=$(git -C "$base" count-objects -v | awk '/^size-pack:/ { print $2 }')
objects=$(git -C "$base" count-objects -v | awk '/^in-pack:/ { print $2 }')
commits=$(git -C "$base" rev-list --all | wc -l)
main_commits=$(git -C "$base" rev-list --count refs/heads/main)
{
  printf 'scenario\tsize-pack KiB\tsize-pack MiB\tobjects\tcommits (all refs)\tcommits (main)\n'
  awk -v s="$size_kib" -v o="$objects" -v c="$commits" -v m="$main_commits" \
    'BEGIN { printf "baseline\t%d\t%.1f\t%d\t%d\t%d\n", s, s / 1024, o, c, m }'
} > "$DATA/baseline.tsv"
cat "$DATA/baseline.tsv"
