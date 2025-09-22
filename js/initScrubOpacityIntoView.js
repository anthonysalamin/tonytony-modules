/**
 * UTILITY | initScrubOpacityIntoView
 * @build 25.08.25 @updated 15:31 PHT
 * Fades elements into view on scroll with a scrubbed opacity transition.
 */

// 🥬 options
const OPTIONS = {
    TRIGGER_SELECTOR: '[data-reveal="scrub-into-view"]',
    START: "top bottom",
    END: "top 95%",
    SCRUB: true,
    MARKERS: false,
    OPACITY_FROM: 0,
    OPACITY_TO: 1
};

// 🥬 helper
function initScrubRevealElement({ EL, OPACITY_FROM, OPACITY_TO, START, END, SCRUB, MARKERS }) {
    gsap.fromTo(
        EL,
        { opacity: OPACITY_FROM },
        {
            opacity: OPACITY_TO,
            ease: "none",
            scrollTrigger: {
                trigger: EL,
                start: START,
                end: END,
                scrub: SCRUB,
                markers: MARKERS
            }
        }
    );
}

// 🍑 export module
export function initScrubOpacityIntoView() {
    const elements = gsap.utils.toArray(OPTIONS.TRIGGER_SELECTOR);
    if (!elements.length) return;

    elements.forEach(el => {
        initScrubRevealElement({
            EL: el,
            OPACITY_FROM: OPTIONS.OPACITY_FROM,
            OPACITY_TO: OPTIONS.OPACITY_TO,
            START: OPTIONS.START,
            END: OPTIONS.END,
            SCRUB: OPTIONS.SCRUB,
            MARKERS: OPTIONS.MARKERS
        });
    });
}