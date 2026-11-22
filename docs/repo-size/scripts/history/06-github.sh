#!/usr/bin/env bash
# Records what GitHub holds for the repository beyond its git history: the
# figures, the pull requests, issues, settings and integrations that a
# rewrite, or recreating the repository, would touch. Reads only.
#
# Writes data/history/github.txt.
set -euo pipefail
. "$(dirname "$0")/env.sh"
repo=fuzzley/fuzzley
out=$DATA/github.txt
api() { gh api "$@" 2>&1 || true; }
{
  echo "# $repo, read $(date -u +%FT%TZ)"
  echo
  echo "## The repository"
  api "repos/$repo" --jq '"size (KB, GitHub'\''s diskUsage): \(.size)\nvisibility: \(.visibility)\ncreated: \(.created_at)\ndefault branch: \(.default_branch)\nstars: \(.stargazers_count)\nwatchers: \(.subscribers_count)\nforks: \(.forks_count)\nopen issues and pull requests: \(.open_issues_count)\nhas pages: \(.has_pages)"'
  echo
  echo "## Pull requests (all states)"
  gh pr list -R "$repo" --state all --limit 100 --json number,state,author,headRefName,mergedAt \
    --jq '.[] | "#\(.number) \(.state) by \(.author.login), \(.headRefName), merged \(.mergedAt)"'
  echo
  echo "## Issues"
  echo "open: $(gh issue list -R "$repo" --state open --limit 500 --json number --jq length)"
  echo "closed: $(gh issue list -R "$repo" --state closed --limit 500 --json number --jq length)"
  echo
  echo "## Branch protection and rulesets"
  echo "rulesets: $(api "repos/$repo/rulesets" --jq length)"
  echo "main's classic protection: $(api "repos/$repo/branches/main/protection" --jq '.message // "set"')"
  echo
  echo "## Settings an integration needs"
  echo "Actions secrets: $(api "repos/$repo/actions/secrets" --jq '[.secrets[].name] | join(", ")')"
  echo "Actions variables: $(api "repos/$repo/actions/variables" --jq '[.variables[].name] | join(", ")')"
  echo "webhooks: $(api "repos/$repo/hooks" --jq length)"
  echo "deploy keys: $(api "repos/$repo/keys" --jq length)"
  echo "collaborators: $(api "repos/$repo/collaborators" --jq '[.[].login] | join(", ")')"
  echo "installed apps (the owner's, any repository): $(api /user/installations --jq '[.installations[].app_slug] | join(", ")')"
  echo
  echo "## Releases, tags, deployments, environments"
  echo "releases: $(api "repos/$repo/releases" --jq length)"
  echo "tags: $(api "repos/$repo/tags" --jq length)"
  echo "deployments: $(api "repos/$repo/deployments" --jq length)"
  echo "environments: $(api "repos/$repo/environments" --jq '.total_count')"
  echo
  echo "## Actions"
  echo "workflows: $(api "repos/$repo/actions/workflows" --jq '[.workflows[] | "\(.name) (\(.state))"] | join(", ")')"
  echo "workflow runs: $(api "repos/$repo/actions/runs?per_page=1" --jq '.total_count')"
  echo "caches: $(api "repos/$repo/actions/caches?per_page=1" --jq '.total_count')"
  echo
  echo "## Dependabot alerts"
  echo "open: $(api "repos/$repo/dependabot/alerts?state=open&per_page=100" --jq length)"
} > "$out"
cat "$out"
