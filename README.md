# My Many Colored Days - An Interactive Web Experience

**[View the Live Demo](https://my-many-colored-days.vercel.app/)**

![A GIF showing the different animated scenes from the web application.](./docs/demo.gif)
*(To create this GIF, you can use a screen recording tool like Giphy Capture or Kap, then save the resulting file to a `docs` folder in your project.)*

---

## About The Project

This is a visually rich, single-page web application that brings Dr. Seuss's book "My Many Colored Days" to life. The project uses modern web technologies to create a fluid, animated experience, with each 'day' or color represented by a unique, full-screen scene that captures the emotion of the text.

The goal was to create a beautiful, artistic, and performant web-based storybook that is enjoyable on any device.

## Key Features

-   **Fully Animated Story:** Each of the 13 pages is a unique, self-contained scene with custom CSS animations.
-   **Smooth Page Transitions:** Elegant cross-fade transitions between scenes are powered by Framer Motion.
-   **Modern Architecture:** Built with a clean, component-based React structure and managed with a lightweight Zustand global store.
-   **Fully Responsive:** The design and animations adapt gracefully to desktop, tablet, and mobile screen sizes.
-   **Performant:** Relies primarily on hardware-accelerated CSS animations to ensure a smooth experience.

## Built With

-   **[React](https://reactjs.org/):** For building the user interface.
-   **[Vite](https://vitejs.dev/):** As the fast build tool and development server.
-   **[Zustand](https://github.com/pmndrs/zustand):** For lightweight, global state management.
-   **[Framer Motion](https://www.framer.com/motion/):** To orchestrate elegant page transitions.
-   **[CSS Modules](https://github.com/css-modules/css-modules):** For scoped, component-level styling and animations.
-   **[Vercel](https://vercel.com/):** For deployment and hosting.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) (version 16 or later) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/my-many-colored-days.git
    ```
    *(Replace `your-username` with your actual GitHub username.)*

2.  **Navigate to the project directory:**
    ```sh
    cd my-many-colored-days
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Start the development server:**
    ```sh
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
