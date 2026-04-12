/**
 * TONYTONY | initMarqueeDualVertical
 * Drives opposing vertical marquee columns inside `[data-marquee="dual-container"]` with scroll-linked GSAP motion.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initMarqueeDualVertical() {
    const container = document.querySelector('[data-marquee="dual-container"]');
    if (!container) return;

    const upward = container.querySelector('[data-marquee="upward"]');
    const downward = container.querySelector('[data-marquee="downward"]');
    const delta = 20;
    const ease = "none"; // "power2.out"
    const scrub = 0.6;
    if (!upward || !downward) return;

    gsap.set(upward, { yPercent: 0 });
    gsap.set(downward, { yPercent: 0 });

    ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: scrub,
        // markers: true,
        animation: gsap.timeline()
            .to(upward, { yPercent: -delta, ease: ease, force3D: true }, 0)
            .to(downward, { yPercent: delta, ease: ease, force3D: true }, 0),
    });
}