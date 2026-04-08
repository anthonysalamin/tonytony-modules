/**
 * TONYTONY | initSwitchThemeCaseStudies
 * *
 * Toggles body background and text color on scroll using ScrollTrigger, reversing smoothly on scroll-up.
 * *
 * @build 07.04.26
 * @updated 08.04.26 PHT
 */

export function initSwitchThemeCaseStudies() {
    const section = document.querySelector('[data-section="case studies"]');
    if (!section) return;

    const bodyStyles = getComputedStyle(document.body);
    const originalBg = bodyStyles.backgroundColor;
    const originalColor = bodyStyles.color;

    gsap.set("body", {
        "--background": originalBg,
        "--text": originalColor,
    });

    gsap.to("body", {
        "--background": "#212121",
        "--text": "#ffffff",
        color: "#ffffff",
        backgroundColor: "#212121",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play reverse play reverse",
        },
    });
}