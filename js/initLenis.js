/**
 * UTILITY | Lenis + GSAP ScrollTrigger
 * @build 22.09.2025 @updated 17:17 PHT
 */

export function initLenis() {
    // initialize Lenis
    const lenis = new Lenis();

    // 🔑 expose globally if other scripts need it
    window.lenis = lenis;

    // 🔄 RAF loop for smooth scrolling
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 🔗 integrate with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    return lenis; // optional, in case you want the instance
}