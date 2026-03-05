# Portfolio v2

A high-performance, visually immersive personal portfolio built with **React 19**, **Vite**, and **Three.js**. This project features advanced scroll-driven animations, smooth cinematic transitions, and a custom-engineered UI experience.

![Portfolio Preview](/public/v0ra.png)

## 🚀 Technical Highlights

- **Smooth Scrolling:** Integrated with **Lenis** for a refined, consistent scrolling experience across all browsers.
- **3D Graphics:** Leveraging **@react-three/fiber** and **@react-three/drei** for performant WebGL/Three.js integrations.
- **Scroll-Driven Transitions:** A custom layering system (`Layers.jsx`) that manages complex color-block transitions and parallax effects based on scroll progress.
- **Interactive Cursor:** A custom-built cursor with spring-physics tracking for a tactile UI feel.
- **Modern React:** Built on **React 19**, utilizing the latest hooks (`useCallback`, `useRef`, `useEffect`) and the React Compiler for optimized performance.
- **Zero Framework CSS:** Stylized with pure **Vanilla CSS**, ensuring lightweight delivery and precise control over every pixel.

## 🛠️ Tech Stack

- **Core:** React 19, Vite
- **Animation & Motion:** Lenis (Smooth Scroll), Custom Scroll Logic
- **3D/WebGL:** Three.js, @react-three/fiber, @react-three/drei
- **Styling:** CSS3 (Custom Properties, Flexbox, Grid, Clip-path animations)
- **Deployment:** Optimized for Vercel/Netlify

## 📁 Project Structure

```text
src/
├── components/
│   ├── Hero/          # 3D Scene and Hero content
│   ├── About/         # Layered "About" sections
│   ├── Projects/      # Project list and horizontal strips
│   ├── Showcase/      # Stacking card gallery with diagonal wipes
│   ├── Contact/       # Interactive "fracture" contact section
│   └── Layout/        # Cursor, Nav, ProgressBar, and Global styles
├── utils/
│   ├── data.js        # Project content and configuration
│   └── utils.js       # Math helpers (lerp, easing, cl)
└── App.jsx            # Core scroll orchestration and lifecycle
```

## 🌟 Key Sections

- **Hero:** A cinematic entry point with 3D elements.
- **The "Between":** A transitional space using layered parallax to shift between narratives.
- **Project Showcase:** A unique stacking-card layout where projects are revealed through diagonal clip-path wipes.
- **Interactive Contact:** A "fractured" UI layout that splits and reveals contact information as the user scrolls.

## 🔧 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yugaaank/portfolio_v2.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## 📜 License

MIT © [Yugank](https://github.com/yugaaank)
