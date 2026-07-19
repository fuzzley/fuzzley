#!/bin/sh
# Regenerate the frontend's runtime config from container environment variables.
#
# The nginx image runs every /docker-entrypoint.d/*.sh (alphabetically) before
# starting nginx, so this overwrites the checked-in placeholder env.js with the
# real values supplied at deploy time.
set -eu

cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV = { GA_ID: "${GA_AG_MEASUREMENT_ID:-}" };
EOF

if [ -n "${GA_AG_MEASUREMENT_ID:-}" ]; then
    echo "40-generate-env-config.sh: env.js written, GA_ID configured"
else
    echo "40-generate-env-config.sh: env.js written, GA_ID not set (analytics disabled)"
fi
