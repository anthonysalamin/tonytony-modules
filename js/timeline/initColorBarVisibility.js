/**
 * TONYTONY | initColorBarVisibility
 * Fades each `.section-timeline.timeline` progress bar in or out with GSAP as its section crosses the viewport.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
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
          start: `top center`,
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