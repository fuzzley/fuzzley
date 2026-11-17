# fuzzley

The source of https://fuzzley.info, a personal site: a static Astro build under
`frontend/`. [DEVELOPMENT.md](DEVELOPMENT.md) covers its layout, its commands,
how the games are fetched and how it is deployed.

A push to `main` deploys at once, without waiting for the checks. Push only
when you are asked to.

## Checks

Run `yarn verify` from `frontend/` before you commit. It type-checks, lints,
checks the formatting and builds.

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
