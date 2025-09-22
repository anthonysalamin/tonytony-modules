/** 
 * UTILITY | initUnblurIntoView
 * @build 09.09.25 @updated 16:50 PHT
 * Unblurs elements as they scroll into view, reducing blur progressively until sharp.
 */

// 🥬 global OPTIONS object
const OPTIONS = {
    SELECTOR: '[data-blur="unblur-into-view"]',
    BLUR_START: "blur(20px)",
    BLUR_END: "blur(0px)",
    START: "top bottom",
    END: "top center",
    SCRUB: true,
    EASE: "none"
};

// 🥬 helper function
function initUnblurElement({ EL, BLUR_START, BLUR_END, START, END, SCRUB, EASE }) {
    gsap.fromTo(
        EL,
        { filter: BLUR_START },
        {
            filter: BLUR_END,
            ease: EASE,
            scrollTrigger: {
                trigger: EL,
                start: START,
                end: END,
                scrub: SCRUB
            }
        }
    );
}

// 🍑 export module
export function initUnblurIntoView() {
    const elements = gsap.utils.toArray(OPTIONS.SELECTOR);
    if (!elements.length) return;

    elements.forEach(el => {
        initUnblurElement({
            EL: el,
            BLUR_START: OPTIONS.BLUR_START,
            BLUR_END: OPTIONS.BLUR_END,
            START: OPTIONS.START,
            END: OPTIONS.END,
            SCRUB: OPTIONS.SCRUB,
            EASE: OPTIONS.EASE
        });
    });
}