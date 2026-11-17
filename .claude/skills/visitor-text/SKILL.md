---
name: visitor-text
description: How the words a visitor reads on fuzzley.info are written — a project's summary and tagline, the write-up on its page, alt text and captions, page descriptions, link and button labels, the 404 page, and the game list in the README — with a shape, a budget and real examples for each kind, and a read-back list for the phrasing an agent falls into. Load it before you add or change any text a visitor will read, even one summary or label inside a larger change. Triggers on: summary, tagline, project page, write-up, description, meta description, alt text, coverAlt, caption, label, link text, button text, 404, README game list, wording, copy, new project, add a game.
---

# Visitor text

> Write it the way you would tell a friend about the project. Say "I" and "you",
> use plain words, and stop early.

This covers the words a visitor reads on fuzzley.info, and the game list in
`README.md`.

It does not cover the profile, the bio, the CV or the work history
(`frontend/src/data/profile.ts`, `frontend/src/content/experience.yaml`, and the
README outside its game list). Those are the owner's own words. Change them only
when you are asked to, and then only what was asked.

## Why this exists

Agents wrote the project pages once, and it showed. One sentence listed three
tools with a comma between each. Counts were spelled out ("Forty-one solitaire
games"). Nobody was in the sentences ("It was first written in 2016 with…").

The games on fuzzley.games had the same fault. The full guide, with the research
behind it, is the `player-text` skill in that repository:
https://github.com/fuzzley/fuzzley-games/tree/main/.agents/skills/player-text.
This file is the part of it that this site needs.

## How to write a line

1. **Find its kind** in the table below.
2. **Say it out loud** to someone who has never seen the project. Write down
   what you said.
3. **Fit it to the budget.** If it will not fit, you are saying too much.
4. **Check that it is true.** A count, a year or a rule comes from the project
   itself: its repository, its `started:` year, the game as it plays now.
5. **Read it back** against the list at the end. If a line trips a mark, write
   the sentence again from the start.

## Habits

1. **"I" for the owner, "you" for the visitor.** "I wrote it in 2013." "You can
   play Klondike in Draw 1 or Draw 3."
2. **What it is, then what is different about it.** When and how it was made
   comes last.
3. **One idea in a sentence.** If you joined two thoughts with a colon or a
   semicolon, write two sentences.
4. **Digits for numbers.** "41 solitaire games", "2 decks on 10 columns".
5. **The ordinary word.** "In your browser", not "browser-based". "I built",
   not "It was developed".
6. **Leave things out.** The page already lists the project's tools beside the
   write-up. Name a tool in a sentence only when you have something to say about
   it: "KineticJS draws the cards on a canvas."
7. **Keep it calm.** No exclamation marks, and no praise with nothing behind it.

## Kinds and budgets

A budget is a limit to write under, not a target to fill.

| Kind             | Where it is                                           | Shape                                                            | Budget                      |
| ---------------- | ----------------------------------------------------- | ---------------------------------------------------------------- | --------------------------- |
| Summary          | `summary:` in a project's front matter                | What it is. What is different about it.                          | 2 sentences, 155 characters |
| Tagline          | `tagline:`                                            | A few words under a project's title. No full stop.               | 48 characters               |
| Write-up         | The body of `frontend/src/content/projects/<slug>.md` | What is different. When and how I made it. Where it is now.      | 60 words                    |
| Alt text         | `coverAlt:` and a gallery picture's `alt:`            | What the picture shows.                                          | 1 sentence, 15 words        |
| Caption          | `caption:` on a gallery picture                       | The name of the game in the picture.                             | 3 words                     |
| Page description | `description=` on a page                              | Who or what the page is about.                                   | 155 characters              |
| Label, link      | Components and pages                                  | A verb first, or the name of the place. No full stop.            | 4 words                     |
| 404, "has moved" | `frontend/src/pages/404.astro` and the like           | What happened. Where to go.                                      | 3 sentences                 |
| README game line | `README.md`, under Games                              | The summary's facts, then the tools as a list. The link is kept. |                             |

A summary is shown in several places: on the Projects page, at the top of the
project's own page, on the CV, and as that page's description for search engines
and link previews. So write it to stand on its own, and keep it short enough for
a search result.

Only the home page shows a tagline, under the title of the featured project.
That is the project with the lowest `order`.

A page description names the owner in the third person: "The browser games
Andrey Gavel has made". A search result shows it away from the site, where "I"
would mean nobody. The home page's own description is part of the profile, so
leave it alone.

## Lines to copy

These are on the site now.

- A summary: "Minesweeper with lives, in your browser. One wrong click doesn't
  have to end the game."
- A summary with a count: "41 solitaire games in your browser, from Klondike and
  FreeCell to Pyramid and Grandfather's Clock. Most have their traditional rule
  variants."
- A write-up: "Minesweeper, but you get lives. Hitting a mine costs one instead
  of ending the game. I first wrote it in 2016 with jQuery and Knockout, and
  later rebuilt it in Angular."
- A short write-up: "I wrote it in 2013. KineticJS draws the cards on a canvas,
  and howler.js plays the card sounds."
- Alt text: "A game of FreeCell with 4 empty free cells."
- A tagline: "The classic, with lives"
- The Projects page: "Games I've built on the side. The newer ones are on
  Fuzzley Games, my own game site."

## House rules

- **American spelling.** color, gray, center.
- **Sentence case** for labels and headings. The names of games keep their
  capitals: Solitaire Collection, Draw 3.
- **Digits for every count.** Write "one" only as a pronoun: "costs one".
- **No full stop** on a label, a link, a heading or a tagline.
- **One name for each thing.** A project is called by its `title:` everywhere.
- **No sentence over 25 words.** Split it.

## Read it back

Do this after the draft, as a separate pass. One mark alone is nothing, since
people write the odd list of three too. Two or three in one paragraph mean the
paragraph was written on autopilot, so write it again.

- **Three things in a row, for the sound of it.** "It plays by mouse, touch or
  keyboard, takes on the palette, and keeps a game in progress." Keep the one
  that matters.
- **A list of tools as a sentence.** "Drawn on canvas with KineticJS, with card
  sounds from howler.js, and Knockout binds the controls." The page lists the
  tools already.
- **Nobody in the sentence.** "It was first written in 2016" becomes "I first
  wrote it in 2016."
- **A thing given a person's verb.** "The site takes on the palette you chose."
  Say what the visitor sees: "The site uses the colors you chose."
- **Words squeezed out.** "The site where the newest are played." Put the small
  words back: "The newer ones are on Fuzzley Games."
- **A colon or a semicolon joining two thoughts.** Write two sentences.
- **A count spelled out.** "Forty-one", "ten columns".
- **A stock phrase.** "With a twist", "from scratch", "a gallery of", "a
  collection of", "seamless", "whether you're a beginner or a pro".
- **A sentence that fits any project.** Put another project's name in it. If it
  is still true, it says nothing.
- **A closing line that sums up** what was just said. Cut it.

## When you change text

- **A project's facts are typed in more than one place.** Its summary and its
  line in `README.md` say the same things. Its `coverAlt` describes its
  screenshot. The descriptions of the home page and the Projects page name
  games too. Change them together.
- **A game changes in its own repository.** Before you state a count of games
  or a rule, look at the game as it is now. For Fuzzley Games, the list of games
  is `frontend/site/src/app/provider/games.ts` in
  https://github.com/fuzzley/fuzzley-games. A game with a `play` field there can
  be played. The categories are in `categories.ts` beside it.
- **Run the checks.** `yarn verify` from `frontend/` type-checks, lints, checks
  the formatting and builds. It fails if a tagline is over 48 characters or a
  summary is over 200.
