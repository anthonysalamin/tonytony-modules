/**
 * TONYTONY | initVideoHeader
 * Pauses hero videos when offscreen (ScrollTrigger) and during active scroll (Lenis idle detection).
 * @build 08.04.26
 * @updated 08.04.26
 */

export function initVideoHeader() {
    const container = document.querySelector('[data-video="hero-container"]');
    if (!container) return;

    const videos = container.querySelectorAll('video[data-video="hero"]');
    const lenis = window.lenis__pageScroll;

    // --- Offscreen pause/play via ScrollTrigger ---
    let isInView = true;

    ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => (isInView = true),
        onEnterBack: () => (isInView = true),
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
    if (!lenis) return;

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
                videos.forEach((v) => v.play().catch(() => {}));
            }
        }, 150);
    });
}