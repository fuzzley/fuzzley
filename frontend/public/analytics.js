// Google Analytics bootstrap, shared by every page on the site.
//
// The measurement ID is never baked in here: it comes from window.__ENV.GA_ID,
// which env.js supplies. env.js is the checked-in placeholder locally and is
// regenerated from the container environment at startup by
// docker-entrypoint.d/40-generate-env-config.sh.
//
// Load env.js first, and keep both tags plain (no async/defer) so they execute
// in order:
//
//     <script src="env.js"></script>
//     <script src="analytics.js"></script>
//
// With no ID configured — local dev, or a container started without
// GA_AG_MEASUREMENT_ID — this does nothing and analytics stays off.
//
// The project sub-pages under project/<slug>/ are builds pushed in from their
// own repositories, which carry no analytics code. Their tags are injected into
// the build output by frontend/tools/inject-analytics.mjs.
(function () {
  "use strict";

  if (!window.__ENV || !window.__ENV.GA_ID) {
    return;
  } //else

  var gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src =
    "https://www.googletagmanager.com/gtag/js?id=" + window.__ENV.GA_ID;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", window.__ENV.GA_ID);
})();
