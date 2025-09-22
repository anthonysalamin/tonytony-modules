/**
 * UTILITY | scrub scale into view
 * @build 08.09.25 @updated 11:03 PHT
 * Scales elements from smaller to full size as they scroll into view.
 */

// 🥬 global OPTIONS object
const OPTIONS = {
    TRIGGER_SELECTOR: '[data-scale="scale-into-view"]',
    START: "top+=15px bottom",
    END: "top 95%",
    SCRUB: true,
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