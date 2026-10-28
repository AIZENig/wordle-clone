# Wordle — Refined

A complete, responsive Wordle clone built with plain HTML, CSS, and JavaScript. No dependencies or build step are required.

## Play

Open `index.html` through a local web server. For example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Features

- Daily puzzle with saved progress and a countdown to the next word
- Unlimited practice mode
- Correct duplicate-letter scoring and word-list validation
- Physical and on-screen keyboard support
- Optional hard mode, high-contrast palette, and light theme
- Synthesized sound effects with a persistent mute setting
- Win/loss animations, confetti, pause, restart, and result sharing
- Statistics, win rate, streaks, and guess distribution
- Responsive layout, accessible labels, and reduced-motion support
- Offline support through a service worker

## Storage

Settings, current games, and statistics use browser `localStorage`. They remain on the current browser only and do not sync across devices. Clearing browser data removes them.

## Files

- `index.html` — interface and dialogs
- `style.css` — responsive visual design and animations
- `script.js` — game logic, storage, audio, and UI behavior
- `manifest.json`, `service-worker.js`, `icon.svg` — install/offline support
