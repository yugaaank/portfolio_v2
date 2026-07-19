# Portfolio V2

A scroll-driven, single-page portfolio for **Yugank Rathore** — built as a print press running through color separations. Each section is a pass of the press; the page advances through fixed, layered panels as you scroll, with a hand-rolled WebGL2 dithering shader bleeding behind every section.

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/license-Private-8a8a8a)](#license)
[![WebGL2](https://img.shields.io/badge/shader-WebGL2-990000)](#architecture)

---

## Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Accessibility](#accessibility)
- [License](#license)

## Overview

The site is a single, immersive scroll experience. Rather than routing between pages, it uses six fixed "passes" — Hero, About, Process, Selected Work, Contact, and a closing Thank You — revealed by three sliding color blocks (dark / cream / lime) that wipe across the viewport as you scroll. The lime layer carries the project "proof sheets": framed plates that advance through a film gate, holding on each project as you scroll.

Key traits:

- **Custom scroll engine** — a `requestAnimationFrame` loop maps scroll position to layer/panel transforms directly via refs, bypassing React's reconciliation for 60 FPS motion.
- **Scroll holds** — the effective scroll position is magnetically biased toward the nearest section (and, within Projects, the nearest proof), so the page settles on each section instead of flowing freely.
- **Procedural dithering** — a from-scratch WebGL2 shader provides the retro halftone texture, reacting to scroll depth.
- **Reduced-motion safe** — all animation degrades to a static, fully-visible layout under `prefers-reduced-motion`.

## Tech Stack

| Area | Choice |
|------|--------|
| Framework | [React 19](https://react.dev/) with the React Compiler |
| Build | [Vite 7](https://vite.dev/) |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Shaders | Hand-rolled WebGL2 (no Three.js) |
| Styling | Custom CSS-in-JS + [Tailwind CSS v4](https://tailwindcss.com/) |
| Utilities | `clsx`, `tailwind-merge` |
| Lint | ESLint 9 (flat config) |

## Getting Started

Requires **Node 20+** and **[Bun](https://bun.sh/)** (the project's package manager).

```bash
git clone https://github.com/yugaaank/portfolio_v2.git
cd portfolio_v2
bun install
bun dev
```

The dev server starts on Vite's default port (5173). Open the printed URL and scroll.

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start the Vite dev server with HMR. |
| `bun run build` | Production build to `dist/`. |
| `bun run preview` | Preview the production build locally. |
| `bun run lint` | Run ESLint across the project. |

## Project Structure

```text
src/
├── components/
│   ├── Hero/          # Landing: title + live dithering shader scene
│   ├── About/         # Bio strip + main panel with skills
│   ├── Between/       # "Process" pass: Design / Develop / Ship
│   ├── Projects/      # Proof-sheet film strip + side strip
│   ├── Contact/       # Dark/light fracture reveal
│   ├── ThankYou/      # Closing shutter
│   ├── Layout/        # Nav, Cursor, Layers, ProgressBar, ScrollSpacers, GlobalCSS
│   └── ui/            # DitheringShader (WebGL2)
├── utils/
│   ├── data.js        # Project content
│   └── utils.js       # cl, lerp, easing, applyLayer/applyPanel helpers
├── App.jsx            # Scroll engine ("the heart") — tick(), holds, layer math
├── main.jsx          # Bootstrap (React root + SmoothScrolling)
└── App.css           # Proof-sheet + project styles
```

## Architecture

The app uses a **bypass** architecture: React owns the component tree and initial render, but the high-frequency scroll animation never touches the reconciler.

### The scroll engine (`App.jsx`)

`tick()` runs on every Lenis scroll event. It reads `window.scrollY`, computes a progress value for each section, and writes CSS transforms straight to DOM nodes via refs:

- **Layers** (`Layers.jsx`) — three full-height color blocks (`l1` dark, `l2` cream, `l3` lime) that resize and slide to open "windows" of content.
- **Panels** — the fixed section panels fade and shift into those windows.
- **Scroll holds** — `syEff` is biased toward the nearest section anchor and damped, so scrolling settles on each section. Inside Projects, a second hold settles on each proof frame.

### Procedural shaders

`src/components/ui/dithering-shader.tsx` is a standalone WebGL2 component. It ships several shapes (simplex, warp, ripple, swirl, dots, sphere) and Bayer dithering (2×2 / 4×4 / 8×8), and accepts a `scrollProgress` prop so the pattern tightens as the page descends. Each section mounts one behind its content at low opacity.

### Content model

Projects live in `src/utils/data.js` as a plain array — edit that file to change the showcased work. Everything else (copy, skills, contact) is in the relevant component.

## Accessibility

- `prefers-reduced-motion: reduce` disables the ambient loops and the layer wipe, jumping straight to a fully-visible static layout.
- Each fixed panel is a labeled `region` (`role="region"` + `aria-label`); the closing is `role="contentinfo"`.
- Nav links have visible `:focus-visible` rings; the custom cursor is suppressed on coarse-pointer (touch) devices.
- No-JS users see the semantic spacer tree; the experience is enhanced, not required.

## License

© 2026 Yugank Rathore. All rights reserved. Private personal project.
