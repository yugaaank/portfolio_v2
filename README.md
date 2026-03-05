# Portfolio v2 — Digital Artisan

A high-performance, visually immersive personal portfolio built with **React 19**, **Vite**, and **Three.js**. This project serves as a showcase of my engineering work, blending **AI/ML** focus with **advanced creative frontend** development.

![Portfolio Preview](/public/v0ra.png)

## 🎨 The Philosophy

This isn't just a website; it's a custom-engineered experience. Eschewing heavy animation libraries, this portfolio uses a **math-first approach** to motion, utilizing linear interpolation (LERP), cubic easing, and complex CSS clip-path wipes for a cinematic, fluid feel.

## 🚀 Technical Highlights

- **Custom Scroll Orchestration:** A manual `tick` system in `App.jsx` calculates progress for every transition, driving layers, opacity, and 3D transforms with precision.
- **3D Interactive Scenes:** Immersive WebGL elements powered by **@react-three/fiber** and **Three.js**.
- **Lenis Smooth Scroll:** Integrated with heavy easing and JS-based "glide-snap" logic for a premium tactile feel.
- **Layered UI Transitions:** A sophisticated layering system (`Layers.jsx`) that manages three independent color blocks (`l1`, `l2`, `l3`) that shift, resize, and slide as you scroll.
- **Project Showcase:** A unique 3D card-stacking gallery with diagonal reveal animations driven by scroll-depth.
- **Interactive Contact:** A "fractured" layout that splits the screen and reveals content through independent sliding panels.

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19 (Hooks, Context, Refs), Vite |
| **Animation** | Lenis (Smooth Scroll), Custom Scroll Math (LERP/Easing) |
| **3D / WebGL** | Three.js, @react-three/fiber, @react-three/drei |
| **Styling** | Vanilla CSS (Grid, Flexbox, Clip-path, Perspective) |
| **Content** | Structured project data and skills manifest |

## 🌟 Featured Projects

- **FFflow:** Terminal-based FFmpeg workflow automation (Rust/TUI).
- **ClearView:** AI-driven data clarity and visualization (Python/Streamlit).
- **FreshR:** Supabase-backed React Native application for university students.
- **AlgoScan:** Cryptographic algorithm identification using ML (CatBoost/Flask).
- **Portfolio v2:** This very site — a React 19 + Three.js creative experiment.

## 🧠 Skill Set

- **Languages:** JavaScript, TypeScript, Java, C, Rust (Learning), Python
- **Frontend:** React, Next.js, Framer Motion, GSAP, CSS3
- **Backend/DB:** Node.js, Express, MongoDB, MySQL, Supabase
- **Specializations:** AI/ML (CatBoost, Scikit-learn), Linux, System Design

## 🔧 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- npm or yarn

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/yugaaank/portfolio_v2.git

# Install dependencies
npm install

# Launch development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```text
src/
├── components/
│   ├── Hero/          # Cinematic 3D entry point
│   ├── Showcase/      # Stacking project cards with clip-path wipes
│   ├── Contact/       # Interactive "fractured" UI layout
│   ├── About/         # Skills and developer narrative
│   └── Layout/        # Scroll-driven Layers, Nav, and Global state
├── utils/
│   ├── data.js        # Source of truth for projects and metadata
│   └── utils.js       # Math engines (lerp, easing, style apply)
└── App.jsx            # The "Brain" - Scroll orchestration logic
```

## 📜 License

MIT © [Yugank](https://github.com/yugaaank)
