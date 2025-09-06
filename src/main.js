// import Lenis
import Lenis from 'lenis'

// import GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, SplitText);

  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  initScrollAnimations();
  window.addEventListener('resize', initScrollAnimations);

  function initScrollAnimations() {
    const container = document.querySelector('.container');
    const images = gsap.utils.toArray(".image").reverse();

    const isMobile = window.innerWidth <= 768;

    const radius = isMobile ? 750 : 1000; // circle radius
    const angleStep = (2 * Math.PI) / images.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=500vh",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });
  
    // Animate each image outward into a circle
    images.forEach((img, i) => {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
    
      // Force all curves to bend clockwise
      const controlRadius = radius * 0.1;        // distance of curve control
      const controlAngle = angle - Math.PI / 2;   // shift 90° clockwise
      const controlX = controlRadius * Math.cos(controlAngle);
      const controlY = controlRadius * Math.sin(controlAngle);
    
      tl.to(img, {
        duration: 1.5,
        delay: i * 0.1,
        scale: 1.5,
        ease: "power2.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0 },                // start
            { x: controlX, y: controlY },  // curve (always clockwise bend)
            { x: x, y: y }                 // final circle spot
          ],
          curviness: 1.5,
          autoRotate: false
        }
      }, 0);
    });    
  }
});
