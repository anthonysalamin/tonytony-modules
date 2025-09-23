/**
 * UTILITY | initColorBarVisibility
 * @build 26.10.23 @updated 15:03 PHT
 * Fades a timeline progress bar in/out based on scroll position.
 */

export function initColorBarVisibility() {
    const triggers = document.querySelectorAll(`.section-timeline.timeline`);
    if (triggers.length === 0) return;
  
    triggers.forEach((trigger) => {
      const duration = 0;
      const bar = trigger.querySelector(`.timeline_progress-bar`);
  
      const opacity = {
        show: { opacity: 1, duration },
        hide: { opacity: 0, duration },
      };
  
      // initial state
      gsap.to(bar, opacity.hide);
  
      gsap.timeline({
        scrollTrigger: {
          trigger,
          start: `top top`,
          end: "bottom top",
          markers: false, // debug
          onEnter: () => gsap.to(bar, opacity.show),
          onEnterBack: () => gsap.to(bar, opacity.show),
          onLeave: () => gsap.to(bar, opacity.hide),
          onLeaveBack: () => gsap.to(bar, opacity.hide),
        },
      });
    });
  }