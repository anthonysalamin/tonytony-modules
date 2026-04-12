/**
 * TONYTONY | initVideoHeader
 * Pauses hero videos when their section leaves view and optionally when Lenis reports active scrolling.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initVideoHeader() {
    const container = document.querySelector('[data-video="hero-container"]');
    if (!container) return;

    const PAUSE_ON_SCROLL = false; // this is not a great UX but it works

    const videos = container.querySelectorAll('video[data-video="hero"]');
    const lenis = window.lenis__pageScroll;

    // --- Offscreen pause/play via ScrollTrigger ---
    let isInView = true;

    ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
            isInView = true;
            videos.forEach((v) => v.play().catch(() => {}));
        },
        onEnterBack: () => {
            isInView = true;
            videos.forEach((v) => v.play().catch(() => {}));
        },
        onLeave: () => {
            isInView = false;
            videos.forEach((v) => v.pause());
        },
        onLeaveBack: () => {
            isInView = false;
            videos.forEach((v) => v.pause());
        },
    });

    // --- Pause during active scroll, resume on idle ---
    if (!PAUSE_ON_SCROLL || !lenis) return;

    let scrollTimeout;
    let isPausedForScroll = false;

    lenis.on("scroll", () => {
        if (!isInView) return;

        if (!isPausedForScroll) {
            isPausedForScroll = true;
            videos.forEach((v) => { if (!v.paused) v.pause(); });
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isPausedForScroll = false;
            if (isInView) {
                videos.forEach((v) => v.play().catch(() => { }));
            }
        }, 150);
    });
}