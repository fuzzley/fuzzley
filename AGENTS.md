# fuzzley

The source of https://fuzzley.info, a personal site: a static Astro build under
`frontend/`. [DEVELOPMENT.md](DEVELOPMENT.md) covers its layout, its commands,
how the games are fetched and how it is deployed.

A push to `main` deploys at once, without waiting for the checks. Push only
when you are asked to.

## Checks

Run `yarn verify` from `frontend/` before you commit. It type-checks, lints,
checks the formatting and builds.

## Images

- **Add or retake a screenshot with `yarn screenshot`.** Every version stays in
  history for good, so retake one only for a change a visitor will see. The
  content schema fails a screenshot that isn't WebP, is wider than the site
  serves or is the wrong shape.
- **A cover is 4:3 to 16:10, with what matters in its top three quarters,**
  since a 16:9 tile cuts a 4:3 cover's bottom. A tile shows the project's
  `tint` below its cover, so set the tint when `yarn screenshot` says to: to
  the color along the cover's bottom edge.
- **A gallery image is 16:9.** A Fuzzley Games one starts from fuzzley-games'
  committed `preview.webp` rather than a new capture.
- **A picture kept with a plan under `docs/` is WebP,** lossless only where it
  must be exact. A "before" picture copies the committed screenshot.

## Writing for visitors

These rules cover every word a visitor reads: summaries, taglines, the write-up
on a project page, alt text, page descriptions and labels.

- **Load the `visitor-text` skill first,** even for one line. It has a shape, a
  budget and examples for each kind of text. It is in
  `.claude/skills/visitor-text/SKILL.md`.
- **Say "I" for the owner and "you" for the visitor.** "I wrote it in 2013", not
  "It was written in 2013".
- **One idea in a sentence.** Digits for numbers. American spelling. Sentence
  case for labels.
- **Say less.** A summary is 2 sentences. A write-up is 60 words.
- **The profile, the bio, the CV and the work history are the owner's own
  words.** Change them only when you are asked to.
