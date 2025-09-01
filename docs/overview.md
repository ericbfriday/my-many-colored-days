# Summary: "My Many Colored Days" Interactive Web Experience

## 1. Project Overview

**Project Name:** My Many Colored Days

**Core Purpose:** This is a single-page, static web application that creates a visually rich, highly animated, interactive experience based on Dr. Seuss's book, "My Many Colored Days." The application guides the user through a series of distinct, full-screen "scenes," each representing a different color and emotion from the book, brought to life with CSS and JavaScript animations.

## 2. Technology Stack

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **State Management:** Zustand (for global state management of the current page)
*   **Animation:**
    *   **Primary:** CSS Modules with Keyframe Animations for scene-specific, self-contained animations.
    *   **Transitions:** Framer Motion (`AnimatePresence`) for smooth, cross-fade transitions between scenes.
*   **Styling:** CSS Modules (e.g., `Component.module.css`) for locally-scoped, component-level styles.
*   **Deployment:** Vercel (Static Site Hosting)

## 3. Project Architecture

The application follows a modern, component-based architecture designed for a single-page experience.

*   **Entry Point:** `main.jsx` mounts the main `App` component into `index.html`.
*   **Central State:** A single Zustand store (`src/store/usePageStore.js`) acts as the single source of truth for the application's state. It holds the `currentPage` index and provides actions (`nextPage`, `previousPage`) to modify it.
*   **Scene Management:** The main `App.jsx` component acts as a controller. It subscribes to the Zustand store and dynamically renders the appropriate scene component based on the `currentPage` index.
*   **Component Structure:**
    *   `/src/components`: Contains reusable, generic components like `Page.jsx` (a layout wrapper), `Navigation.jsx`, and `AnimatedText.jsx`.
    *   `/src/components/scenes`: Contains a dedicated component for each of the 13 scenes in the story (e.g., `RedDay.jsx`, `BlueDay.jsx`). Each scene component is responsible for its own layout, imagery, and animations.
*   **Styling:** Each component and scene has its own corresponding CSS Module file. This encapsulates styles and animations, preventing conflicts and making the project highly modular.
*   **Page Transitions:** `App.jsx` uses Framer Motion's `<AnimatePresence>` component to manage the mounting and unmounting of scenes. This allows for animated transitions (a fade-in/fade-out effect) when the `currentPage` state changes.

## 4. Key Features & Implementation

*   **State-Driven Navigation:** The entire user journey is controlled by the `currentPage` integer in the Zustand store. The UI (`Navigation.jsx`) dispatches actions to increment or decrement this value.
*   **Modular, Self-Contained Scenes:** Each scene is a self-contained unit with its own JSX and CSS Module. This makes it easy to debug, modify, or add new scenes without affecting others.
*   **Responsive Design:** Responsiveness is implemented at the component level using `@media (max-width: 768px)` queries within each CSS Module. This allows for targeted adjustments to font sizes, element positions, and animation scales on smaller viewports.
*   **Performant Animations:** The primary reliance on CSS Keyframe animations for in-scene effects ensures they are performant and can be offloaded to the browser's compositor thread. Framer Motion is used judiciously for the higher-level task of orchestrating page transitions.

## 5. How to Run Locally

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`
4.  The application will be available at `http://localhost:5173`.
