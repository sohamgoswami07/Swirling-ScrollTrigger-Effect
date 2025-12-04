# Swirling ScrollTrigger Effect

A visual web experiment featuring a swirling image gallery animation triggered by scrolling. This project demonstrates how to create complex, high-performance scroll-linked animations using GSAP and Lenis.

## Description

This project showcases a unique "swirling" effect where images spiral out from the center of the screen as the user scrolls down. It leverages **GSAP's ScrollTrigger** and **MotionPathPlugin** to orchestrate the movement along a curved path, while **Lenis** ensures a buttery-smooth scrolling experience. The layout is responsive, adjusting the swirl radius for mobile, tablet, and desktop screens.

## Features

-   **Smooth Scrolling**: Implemented using [Lenis](https://lenis.studio/) for a premium feel.
-   **Complex Animation**: Images follow a calculated spiral path using GSAP's `MotionPathPlugin`.
-   **Scroll-Linked Interaction**: The animation progress is directly tied to the scrollbar via `ScrollTrigger` with `scrub: true`.
-   **Responsive Design**: The animation logic dynamically adjusts the radius and path based on the viewport width.
-   **Performance Optimized**: Uses `gsap.ticker` to synchronize Lenis and ScrollTrigger, and disables lag smoothing for direct control.

## Tech Stack

-   **HTML5**: Semantic structure.
-   **CSS3**: Styling and layout (centered absolute positioning).
-   **JavaScript (Vanilla)**: Core logic and initialization.
-   **GSAP (GreenSock Animation Platform)**:
    -   `gsap.core`: Main animation engine.
    -   `ScrollTrigger`: Triggers animations on scroll.
    -   `MotionPathPlugin`: Handles the curved movement along a path.
-   **Lenis**: Smooth scrolling library.

## Installation & Usage

Since this is a static site project using vanilla JavaScript and CDNs, no complex build step is strictly required to run it.

1.  **Clone the repository** (or download the files):
    ```bash
    git clone <repository-url>
    ```

2.  **Open `index.html`**:
    You can simply open the `index.html` file in your web browser.

    *Recommended*: For the best experience (and to avoid any potential CORS issues with local file loading), use a local development server like Live Server (VS Code extension) or Vite.

    **Using Vite (if package.json is present):**
    ```bash
    npm install
    npm run dev
    ```

## Project Structure

-   `index.html`: Main entry point. Loads styles, CDNs (GSAP, Lenis), and the main script.
-   `style.css`: Basic reset and styling to center images and handle the dark theme.
-   `main.js`: Contains all the logic:
    -   Initializes Lenis for smooth scrolling.
    -   Registers GSAP plugins.
    -   Calculates the spiral path geometry based on window size.
    -   Creates the GSAP Timeline linked to ScrollTrigger.
-   `images/`: Directory containing the image assets.

## Customization

You can tweak the animation in `main.js`:

-   **Scroll Distance**: Change `end: "+=5000vh"` in the `ScrollTrigger` config to make the scroll longer or shorter.
-   **Swirl Radius**: Adjust the `radius` values in the `initScrollAnimations` function.
-   **Curviness**: Modify `curviness: 1.5` in the `motionPath` object to change how "round" the spiral path feels.
