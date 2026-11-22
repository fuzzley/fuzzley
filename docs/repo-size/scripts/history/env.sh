# Sourced by the history-rewrite dry runs: where the mirrors, the raw logs and
# the data they print go, and the tools they run.
#
#   REPO         the repository's root, found from this folder
#   DATA         where what each script prints goes, docs/repo-size/data/history
#                unless set
#   WORK         the mirrors and raw logs, outside the repository, unless set
#   MIRROR       the untouched mirror every scenario is copied from
#   FILTER_REPO  git-filter-repo, unless set
#   URL          the repository on GitHub
#   OTHER        fuzzley-games' clone, whose short hashes the notes name too
REPO=$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)
DATA=${DATA:-$REPO/docs/repo-size/data/history}
WORK=${WORK:-$(dirname "$REPO")/repo-size-fuzzley-2026-11-21}
MIRROR=$WORK/fuzzley.git
FILTER_REPO=${FILTER_REPO:-$HOME/.local/bin/git-filter-repo}
URL=https://github.com/fuzzley/fuzzley.git
OTHER=${OTHER:-$(dirname "$REPO")/fuzzley-games}
# The folders the committed game builds were kept in: the old site's
# project/<slug>/ at the root, then frontend/public/project/<slug>/ and
# frontend/public/projects/<slug>/play/ until 2026-10-10, when the games
# moved to their releases. Nothing at main's tip is under them.
GAME_BUILDS='^(frontend/public/)?projects?/'
# The old site's vendored libraries: Materialize, jQuery and a hasher, at the
# root and then under frontend/public/external/. Gone since 2026-10-10.
VENDORED='^(frontend/public/)?external/'
export REPO DATA WORK MIRROR FILTER_REPO URL OTHER GAME_BUILDS VENDORED
mkdir -p "$DATA" "$WORK"

# Refuses to go on unless a mirror's push URL is the invalid one, so nothing
# these scripts run can push.
#   guard_push <git-dir>
guard_push() {
  local push
  push=$(git -C "$1" remote get-url --push origin 2>/dev/null || echo none)
  if [ "$push" != DISABLED ]; then
    echo "refusing: $1 pushes to $push" >&2
    exit 1
  fi
  case "$(cd "$1" && pwd)" in
    "$WORK"/*) ;;
    *)
      echo "refusing: $1 is not under $WORK" >&2
      exit 1
      ;;
  esac
}

# Makes a scenario's copy of the untouched mirror, its push URL disabled.
#   copy_mirror <name>   prints the copy's path
copy_mirror() {
  local dest=$WORK/$1.git
  rm -rf "$dest"
  cp -a "$MIRROR" "$dest"
  git -C "$dest" remote set-url --push origin DISABLED
  guard_push "$dest"
  echo "$dest"
}

# Expires every reflog and repacks as tightly as git can, as GitHub's own
# figure is measured after.
#   gc_tight <git-dir>
gc_tight() {
  git -C "$1" reflog expire --expire=now --all
  git -C "$1" gc --aggressive --prune=now --quiet
}

# Prints seconds since the epoch, to a tenth.
now() { date +%s.%N; }
# Prints the seconds between two `now`s, to a tenth.
#   elapsed <start> <end>
elapsed() { awk -v a="$1" -v b="$2" 'BEGIN { printf "%.1f", b - a }'; }
