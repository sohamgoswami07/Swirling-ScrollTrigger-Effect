// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  // Note: In vanilla JS with CDNs, plugins are often auto-registered, but it's good practice to do it explicitly if needed.
  // SplitText is removed as it is a premium plugin and not available on public CDNs.
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

  // --- Lenis Setup ---
  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame to GSAP's ticker for synchronized updates
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable GSAP's lag smoothing to prevent stuttering during heavy scrolling
  gsap.ticker.lagSmoothing(0);

  // --- Scroll Animations ---
  initScrollAnimations();

  // Re-initialize animations on window resize to handle responsiveness
  window.addEventListener('resize', initScrollAnimations);

  /**
   * Initializes the scroll-triggered animations for the images.
   */
  function initScrollAnimations() {
    const container = document.querySelector('.container');
    // Get all images and reverse them to animate from the last one if needed, 
    // or just to match the visual stacking order.
    const images = gsap.utils.toArray(".image").reverse();

    // Determine the radius of the circle based on the viewport width
    let radius;
    if (window.innerWidth <= 768) {
      radius = 800; // Mobile
    } else if (window.innerWidth <= 1024) {
      radius = 1200; // Tablet
    } else {
      radius = 1600; // Desktop
    }

    // Calculate the angle step for distributing images in a circle
    const angleStep = (2 * Math.PI) / images.length;

    // Create a GSAP timeline linked to the scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=5000vh", // Extended scroll distance for a slower, smoother animation
        scrub: true,     // Link animation progress directly to scrollbar
        pin: true,       // Pin the container during the animation
        pinSpacing: true, // Add spacing to compensate for the pinned element
      },
    });

    // Animate each image outward into a circular pattern
    images.forEach((img, i) => {
      // Calculate the target position on the circle
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      // --- Curve Control Points ---
      // Calculate control points to force all curves to bend clockwise
      const controlRadius = radius * 0.1;        // Distance of curve control point from center
      const controlAngle = angle - Math.PI / 2;   // Shift 90° clockwise for the bend
      const controlX = controlRadius * Math.cos(controlAngle);
      const controlY = controlRadius * Math.sin(controlAngle);

      // Add the animation to the timeline
      tl.to(img, {
        duration: 1.5,
        delay: i * 0.1, // Stagger the start of each image's animation
        scale: 1.5,     // Scale up the image as it moves out
        ease: "power2.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0 },                // Start at the center
            { x: controlX, y: controlY },  // Control point for the curve
            { x: x, y: y }                 // Final position on the circle
          ],
          curviness: 1.5, // Smoothness of the curve
          autoRotate: false // Do not rotate the element along the path
        }
      }, 0); // Start all animations at the beginning of the timeline (with their respective delays)
    });
  }
});
