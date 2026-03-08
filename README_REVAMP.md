# Vega Racing Electric - Website Revamp

Welcome to the premium VRE website revamp. This project has been migrated to **Vite** for blazing fast performance and uses a modern Formula Student aesthetic.

## Tech Stack
- **Framework**: React 18 + Vite
- **3D Engine**: Three.js (@react-three/fiber & @react-three/drei)
- **Animations**: GSAP + ScrollTrigger
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Customization
- **Technical Specs**: Edit `src/data/specs.js`
- **Competition History**: Edit `src/data/achievements.js`
- **Engineering Subsystems**: Edit `src/data/subsystems.js`
- **Team Members**: Edit `src/data/team.js`
- **Sponsors**: Edit `src/data/sponsors.js`
- **Colors & Fonts**: Modify `tailwind.config.js` and `src/index.css`

## 3D Car Model
The 3D car is currently a placeholder box. 
To replace it:
1. Place your `car.glb` file in the `/public/` directory.
2. Update `src/components/CarViewer.jsx` to load the model instead of the `CarPlaceholder` component.
   ```jsx
   const { scene } = useGLTF('/car.glb')
   return <primitive object={scene} />
   ```

## Design Principles
- **Aesthetic**: Dark, cinematic, high-performance.
- **Color Palette**: 
  - Background: #0A0A0A
  - Accent: #E63946 (VRE Red)
  - Text: #FFFFFF / #888888
- **Typography**: 
  - Headings: Orbitron
  - Body: IBM Plex Sans
  - Data: IBM Plex Mono
