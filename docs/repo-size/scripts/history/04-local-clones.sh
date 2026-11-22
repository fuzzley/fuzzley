#!/usr/bin/env bash
# Lists every local clone and worktree of the repository under the projects
# folder, with what in each would be lost to a fresh clone: commits no remote
# branch holds, stash entries, and changed or untracked files. Reads with
# --no-optional-locks, so nothing writes another session's index.
#
#   04-local-clones.sh [projects-dir]   the repository's parent folder by default
#
# Writes data/history/local-clones.txt.
set -euo pipefail
. "$(dirname "$0")/env.sh"
root=${1:-$(dirname "$REPO")}
out=$DATA/local-clones.txt
g() { git --no-optional-locks "$@"; }
{
  echo "# Local clones of $URL under $root, $(date -u +%FT%TZ)"
  for d in "$root"/*/; do
    d=${d%/}
    [ -e "$d/.git" ] || continue
    url=$(g -C "$d" remote get-url origin 2>/dev/null || true)
    case $url in *fuzzley/fuzzley | *fuzzley/fuzzley.git) ;; *) continue ;; esac
    common=$(cd "$d" && cd "$(g rev-parse --git-common-dir)" && pwd)
    echo
    echo "## $d (git dir $common)"
    echo "branch: $(g -C "$d" branch --show-current)"
    echo "commits on no remote branch: $(g -C "$d" rev-list --count --branches --not --remotes)"
    echo "stash entries: $(g -C "$d" stash list | wc -l)"
    echo "changed or untracked paths: $(g -C "$d" status --porcelain | wc -l)"
  done
} > "$out"
cat "$out"
