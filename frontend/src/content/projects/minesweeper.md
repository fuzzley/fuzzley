---
title: Minesweeper
homeSlot: 1
order: 3
started: 2016
status: active
kind: arcade
tagline: The classic, with lives
summary: Minesweeper in the browser, with lives, so one wrong click doesn't have to end the game.
stack: [TypeScript, Angular 22, Vite, Sass]
repo: https://github.com/fuzzley/fuzzley-games/tree/main/frontend/games/minesweeper
playUrl: https://fuzzley.games/play/minesweeper/
playLabel: Play on fuzzley.games
tint: "#0e1a2b"
cover: ../../assets/projects/minesweeper.png
coverAlt: A Minesweeper board of cyan tiles partly cleared, with the mines left, three lives and the time at the top.
---

Minesweeper with a twist: you start with lives, so stepping on a mine costs one
instead of ending the game. It plays by mouse, touch or keyboard, takes on the
palette chosen on fuzzley.games, and keeps a game in progress across a reload.

It was first written in 2016 with jQuery, Knockout and Bootstrap. It's now an
Angular app built with Vite, part of [Fuzzley Games](/projects/fuzzley-games/).
