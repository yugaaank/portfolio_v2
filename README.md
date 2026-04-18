# Portfolio V2

A high-performance, visually immersive personal portfolio built with **React 19**, **Vite**, and **Three.js**. This project features a custom-built animation engine, advanced WebGL2 shaders, and a sophisticated multi-layered UI architecture designed for maximum performance and visual impact.

## 🚀 Key Features

- **Custom Scroll-Driven Animation Engine:** High-frequency UI updates synchronized via `requestAnimationFrame` and direct DOM manipulation for 60+ FPS performance.
- **Layered UI Transition System:** A complex multi-layer reveal system where background blocks and foreground panels interact dynamically based on scroll depth.
- **Advanced WebGL2 Dithering Shaders:** Custom-coded shaders providing artistic effects like Simplex Noise, Warp, Ripple, and Swirl, with configurable Bayer dithering patterns.
- **Interactive 3D Scenes:** Seamless integration of Three.js environments using `@react-three/fiber` and `@react-three/drei`.
- **Contact Fracture Effect:** A unique "fracture" reveal animation for the contact section, splitting the interface into dark and light thematic content.
- **Smooth Momentum Scrolling:** Orchestrated by **Lenis** for a refined, premium feel.
- **React Compiler (React Forget):** Utilizing the latest React compilation techniques for optimized re-renders and performance.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) (with React Compiler)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & Custom `RAF` loops
- **3D Engine:** [Three.js](https://threejs.org/) via [R3F](https://github.com/pmndrs/react-three-fiber)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **State Management:** React Hooks & Direct Ref manipulation
- **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
src/
├── components/
│   ├── Hero/          # 3D Scene orchestration and landing visuals
│   ├── About/         # Scroll-revealed biographical sections
│   ├── Between/       # Transitional UI elements
│   ├── Projects/      # Dynamic project list and stack displays
│   ├── Contact/       # Multi-layer fracture reveal contact system
│   ├── Layout/        # Core UI: Nav, Cursor, Layers, Progress Bar
│   ├── Showcase/      # Media-heavy visual showcase
│   └── ui/            # Atomic components and WebGL Shaders
├── lib/               # Shared utilities and TypeScript definitions
├── utils/             # Animation helpers and project data
├── App.jsx            # Central Animation Controller (The "Heart")
└── main.jsx           # Application Bootstrap
```

## 🏗️ Architecture Overview

The application utilizes a "Bypass" architecture for performance. While React handles the component lifecycle and initial render, the high-frequency animation logic (scroll-based transitions) bypasses the React reconciliation loop.

### 1. The Animation Loop (`App.jsx`)
The `tick()` function, wrapped in `useCallback` and triggered by `requestAnimationFrame`, calculates exact scroll percentages for every major section. These values are used to:
- Apply CSS transforms directly to DOM elements via `refs`.
- Update uniform variables in custom shaders.
- Orchestrate the `Layers.jsx` color-block transitions.

### 2. Multi-Layer Reveal
The `Layers.jsx` component manages three distinct background layers (`l1`, `l2`, `l3`) that scale and shift to create "windows" of content. This is complemented by `applyLayer` and `applyPanel` utility functions that handle the complex math of clipping and parallax.

### 3. Procedural Shaders
Located in `src/components/ui/dithering-shader.tsx`, the WebGL2 implementation provides a retro-digital aesthetic. It supports real-time manipulation of:
- **Shapes:** Simplex, Warp, Ripple, Swirl.
- **Dithering:** Bayer 2x2, 4x4, 8x8.
- **Color Palettes:** Interactive RGB/Hex mapping.

## 🌟 Featured Projects

The portfolio showcases several high-impact projects:
- **FFflow:** Rust-based TUI for FFmpeg workflow automation.
- **ClearView:** AI-driven data visualization tool in Python.
- **FreshR:** React Native & Supabase mobile application for campus management.
- **AlgoScan:** Machine learning tool for cryptographic algorithm identification.

## 🚦 Getting Started

### Prerequisites
- **Node.js:** v20.x or higher
- **Bun:** (Recommended) v1.1.x or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yugaaank/portfolio_v2.git
   cd portfolio_v2
   ```

2. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server:**
   ```bash
   bun dev
   ```

4. **Production Build:**
   ```bash
   bun run build
   ```

## 📜 License

© 2026 Yugaaank. All rights reserved. Private personal project.
