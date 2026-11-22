#!/usr/bin/env bash
# Measures fuzzley/fuzzley.github.io, the repository that publishes the
# GitHub Pages copy of the site, and dry-runs its rewrite on a mirror: every
# path but the two its tip holds goes, every commit stays.
#
# Writes data/history/pages-repo.txt. Reads GitHub; pushes nothing.
set -euo pipefail
. "$(dirname "$0")/env.sh"
repo=fuzzley/fuzzley.github.io
mirror=$WORK/fuzzley.github.io.git
rewritten=$WORK/fuzzley.github.io-rewritten.git
out=$DATA/pages-repo.txt
rm -rf "$mirror" "$rewritten"
git clone --quiet --mirror "https://github.com/$repo.git" "$mirror"
git -C "$mirror" remote set-url --push origin DISABLED
guard_push "$mirror"
{
  echo "# $repo, read $(date -u +%FT%TZ)"
  echo
  gh api "repos/$repo" --jq '"GitHub'\''s size (KB): \(.size)\nstars: \(.stargazers_count), forks: \(.forks_count), Pages: \(.has_pages)"'
  echo "refs: $(git -C "$mirror" for-each-ref --format='%(refname)' | tr '\n' ' ')"
  echo "pull requests: $(gh pr list -R "$repo" --state all --json number --jq length)"
  echo "rulesets: $(gh api "repos/$repo/rulesets" --jq length)"
  echo "environments: $(gh api "repos/$repo/environments" --jq '[.environments[].name] | join(", ")')"
  echo "workflow runs: $(gh api "repos/$repo/actions/runs?per_page=1" --jq .total_count)"
  echo "commits: $(git -C "$mirror" rev-list --count --all), signed: $(git -C "$mirror" log '--format=%G?' | grep -vc '^N' || true)"
  echo "first: $(git -C "$mirror" log --reverse --format='%h %cs %s' | head -1)"
  echo "last: $(git -C "$mirror" log -1 --format='%h %cs %s')"
  echo "main's tip: $(git -C "$mirror" ls-tree -r --name-only refs/heads/main | tr '\n' ' ')"
  echo
  echo "## Blobs on disk, by the first path each was stored under"
  git -C "$mirror" rev-list --objects --all |
    git -C "$mirror" cat-file --batch-check='%(objecttype) %(objectsize:disk) %(rest)' |
    awk '$1 == "blob" { n = split($3, a, "/"); k = (n > 2) ? a[1] "/" a[2] "/" : $3; s[k] += $2; t += $2 }
      END { for (k in s) if (s[k] > 524288) printf "%8.2f MiB  %s\n", s[k] / 1048576, k; printf "%8.2f MiB  all\n", t / 1048576 }' | sort -rn
  echo
  echo "## The dry run: --path .github/ --path README.md, --prune-empty never"
  cp -a "$mirror" "$rewritten"
  (cd "$rewritten" && "$FILTER_REPO" --quiet --prune-empty never --prune-degenerate never \
    --path .github/ --path README.md) > /dev/null 2>&1
  gc_tight "$mirror"
  gc_tight "$rewritten"
  echo "size-pack before (repacked as after): $(git -C "$mirror" count-objects -vH | awk '/^size-pack:/ { print $2, $3 }')"
  echo "size-pack after: $(git -C "$rewritten" count-objects -vH | awk '/^size-pack:/ { print $2, $3 }')"
  echo "commits after: $(git -C "$rewritten" rev-list --count --all)"
  if diff <(git -C "$mirror" ls-tree -r refs/heads/main) <(git -C "$rewritten" ls-tree -r refs/heads/main) > /dev/null; then
    echo "main's tree: the same"
  else
    echo "main's tree: DIFFERENT"
  fi
  git -C "$rewritten" fsck --full --no-progress > /dev/null 2>&1 && echo "fsck: ok" || echo "fsck: failed"
} > "$out"
cat "$out"
