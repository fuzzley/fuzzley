#!/usr/bin/env bash
# Runs filter-repo's analysis on a copy of the mirror, then inventory.mjs,
# which sorts every blob by what it is and lists the blobs r3 strips.
#
# Needs 01-mirror.sh first. Writes data/history/inventory-*.tsv, and
# $WORK/inventory/r3-strip-ids.txt.
set -euo pipefail
. "$(dirname "$0")/env.sh"
a=$(copy_mirror analyze)
(cd "$a" && "$FILTER_REPO" --analyze --quiet) > /dev/null 2>&1
cp "$a/filter-repo/analysis/extensions-all-sizes.txt" "$DATA/analysis-extensions.txt"
node "$(dirname "$0")/inventory.mjs" "$WORK/baseline.git" "$a/filter-repo/analysis" "$WORK/inventory" "$DATA"
