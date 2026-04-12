/**
 * TONYTONY | initScrubOpacityIntoView
 * Fades each `[data-reveal="scrub-into-view"]` block in with opacity scrubbed across its ScrollTrigger range.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

// 🥬 options
const OPTIONS = {
    TRIGGER_SELECTOR: '[data-reveal="scrub-into-view"]',
    START: "top+=15px bottom",
    END: "top 95%",
    SCRUB: 0.8,
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