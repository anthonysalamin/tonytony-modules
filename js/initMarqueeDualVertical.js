/**
 * TONYTONY | initMarqueeDualVertical
 * Dual vertical marquee with scroll-driven opposing Y translations
 * @build 30.03.26
 * @updated 30.03.26 PHT
 */

export function initMarqueeDualVertical() {
    console.log('initMarqueeDualVertical');
    const container = document.querySelector('[data-marquee="dual-container"]');
    if (!container) return;

    const upward = container.querySelector('[data-marquee="upward"]');
    const downward = container.querySelector('[data-marquee="downward"]');
    if (!upward || !downward) return;

    gsap.set(upward, { yPercent: 0 });
    gsap.set(downward, { yPercent: 0 });

    ScrollTrigger.create({
        trigger: container,
        start: "top 90%",
        end: "top 10%",
        scrub: true,
        markers: false,
        animation: gsap.timeline()
            .to(upward, { yPercent: -20, ease: "none" }, 0)
            .to(downward, { yPercent: 20, ease: "none" }, 0),
    });
}