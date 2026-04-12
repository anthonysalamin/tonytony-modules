/**
 * TONYTONY | initScrubScaleIntoView
 * Scales each `[data-scale="scale-into-view"]` element from a reduced size to 1:1 with scrubbed ScrollTrigger motion.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

// 🥬 global OPTIONS object
const OPTIONS = {
    TRIGGER_SELECTOR: '[data-scale="scale-into-view"]',
    START: "top+=15px bottom",
    END: "top 95%",
    SCRUB: 0.8,
    MARKERS: false,
    SCALE_FROM: 0.8,
    SCALE_TO: 1
  };
  
  // 🥬 helper function
  function ScrubScaleIntoView({ TRIGGER_SELECTOR, START, END, SCRUB, MARKERS, SCALE_FROM, SCALE_TO }) {
    gsap.utils.toArray(TRIGGER_SELECTOR).forEach(el => {
      gsap.fromTo(el,
        { scale: SCALE_FROM },
        {
          scale: SCALE_TO,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: START,
            end: END,
            scrub: SCRUB,
            markers: MARKERS
          }
        }
      );
    });
  }
  
  // 🍑 export module
  export function initScrubScaleIntoView() {
    if (!document.querySelectorAll(OPTIONS.TRIGGER_SELECTOR).length) return;
    ScrubScaleIntoView(OPTIONS);
  }