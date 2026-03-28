// initGraphicSVG.js
// Scroll-triggered SVG circle draw animation with scrub
// Applies to all SVGs with [data-graphic] attribute
// Updated: 28.03.26 PHT

export function initGraphicSVG() {
    const svgs = document.querySelectorAll("[data-graphic]");
    if (!svgs.length) return;
  
    svgs.forEach((svg) => {
      const circles = svg.querySelectorAll("circle");
      if (!circles.length) return;
  
      // Set up each circle for stroke drawing
      circles.forEach((circle) => {
        const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
      });
  
      // Create timeline with scrub-linked ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top bottom",
          end: "bottom 90%",
          scrub: true,
        },
      });
  
      // Stagger the circle draws across the timeline
      circles.forEach((circle, i) => {
        tl.to(
          circle,
          {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
          },
          i * 0.3
        );
      });
    });
  }