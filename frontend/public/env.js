// Runtime configuration for the static frontend.
//
// This checked-in file is the LOCAL DEFAULT and intentionally contains no real
// IDs. In the deployed container it is overwritten at startup by
// docker-entrypoint.d/40-generate-env-config.sh, which reads values from the
// runtime environment (e.g. GA_AG_MEASUREMENT_ID env variable).
window.__ENV = { GA_ID: "" };
