#!/usr/bin/env bash
# Counts the places that name a fuzzley commit by hash: the files at main's
# tip (from the mirror), fuzzley-games' files (OTHER, which it only reads)
# and the memory notes.
#
# Writes data/history/hash-refs-summary.tsv, -files.tsv and -odd.tsv.
set -euo pipefail
. "$(dirname "$0")/env.sh"
MEMORY=${MEMORY:-$HOME/.claude/projects/-home-dev-Projects-personal/memory}
node "$(dirname "$0")/hash-refs.mjs" "$MIRROR" "$OTHER" "$MEMORY" "$DATA"
