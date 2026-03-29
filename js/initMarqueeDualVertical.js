/**
 * TONYTONY | initMarqueeDualVertical
 * Dual vertical marquee with scroll-driven opposing Y translations
 * @build 30.03.26
 * @updated 30.03.26 PHT
 */

export function initMarqueeDualVertical() {
    const container = document.querySelector('[data-marquee="dual-container"]');
    if (!container) return;

    const upward = container.querySelector('[data-marquee="upward"]');
    const downward = container.querySelector('[data-marquee="downward"]');
    const delta = 15;
    const ease = "power2.out";
    if (!upward || !downward) return;

    gsap.set(upward, { yPercent: 0 });
    gsap.set(downward, { yPercent: 0 });

    ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: true,
        animation: gsap.timeline()
            .to(upward, { yPercent: -delta, ease: ease }, 0)
            .to(downward, { yPercent: delta, ease: ease }, 0),
    });
}