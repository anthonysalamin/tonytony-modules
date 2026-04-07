/**
 * TONYTONY | initSwitchTheme
 * Toggles body background and text color on scroll using ScrollTrigger, reversing smoothly on scroll-up.
 * @build 07.04.26
 * @updated 07.04.26 PHT
 */

export function initSwitchTheme() {
    const section = document.querySelector('[data-section="case-study"]');
    if (!section) return;

    gsap.to("body", {
        css: { backgroundColor: "#212121 !important" },
        color: "#ffffff",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "bottom 70%",
            markers: true,
            toggleActions: "play none none reverse",
        },
    });
}