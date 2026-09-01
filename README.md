# QMG Fronts - Card Tracker

An unofficial, browser-based companion for **Quartermaster General: South Front** and **East Front**. It helps players track revealed cards and estimate the chance that the opposing side holds a given reaction card.

## What it does

- Tracks revealed discards, face-down discards, and the opponent's hand size.
- Calculates live reaction-card probabilities by faction.
- Filters cards by deck status, war era, reaction, and action type.
- Supports South Front and East Front from the `GAME` selector.
- Keeps a separate saved state for every table and game edition.
- Includes historical Wikipedia links for the cards.
- Includes an optional experimental BGA log companion for local testing.

## Use it

Open [index.html](index.html) in a modern browser. No installation, server, or account is required for the tracker itself.

Choose the table, then the game edition. Game data is stored locally in the browser via `localStorage`, so it stays on your device and can be cleared from the browser settings.

## Experimental BGA Sync

The optional local proof of concept is in [experimental-bga-sync](experimental-bga-sync). It observes visible BGA log nodes only after you connect an open table, then keeps that captured history locally. Existing BGA log entries are treated as a partial snapshot and never reset tracker cards.

See [experimental-bga-sync/README.md](experimental-bga-sync/README.md) for the temporary developer-mode setup and known limitations. It is not an official BGA integration.

## Technology

Static HTML, CSS, and vanilla JavaScript. No dependencies.

## Credits and Disclaimer

Interface by **Gabrieles Zinn**. Special thanks to **korosif**.

*Quartermaster General: South Front* and *Quartermaster General: East Front* were designed by Ian Brody and are published by Ares Games / Griggling Games. This is an unofficial fan-made companion and is not affiliated with or endorsed by the designers or publisher. All game-related names and artwork remain the property of their respective rights holders.
