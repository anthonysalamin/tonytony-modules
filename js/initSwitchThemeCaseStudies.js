/**
 * TONYTONY | initSwitchThemeCaseStudies
 * *
 * Toggles body background and text color on scroll using ScrollTrigger, reversing smoothly on scroll-up.
 * *
 * @build 07.04.26
 * @updated 09.04.26 PHT
 */

export function initSwitchThemeCaseStudies() {
    const section = document.querySelector('[data-section="case-studies"]');
    if (!section) return;

    const root = getComputedStyle(document.documentElement);
    const LIGHT_THEME_BACKGROUND = root.getPropertyValue('--light-theme--background').trim();
    const LIGHT_THEME_TEXT = root.getPropertyValue('--light-theme--text').trim();
    const LIGHT_THEME_LIGHT = root.getPropertyValue('--light-theme--light').trim();
    const DARK_THEME_BACKGROUND = root.getPropertyValue('--dark-theme--background').trim();
    const DARK_THEME_TEXT = root.getPropertyValue('--dark-theme--text').trim();
    const DARK_THEME_LIGHT = root.getPropertyValue('--dark-theme--light').trim();

    gsap.set("body", {
        "--light-theme--background": LIGHT_THEME_BACKGROUND,
        "--light-theme--text": LIGHT_THEME_TEXT,
        "--light-theme--light": LIGHT_THEME_LIGHT,
    });

    gsap.to("body", {
        "--light-theme--background": DARK_THEME_BACKGROUND,
        "--light-theme--text": DARK_THEME_TEXT,
        "--light-theme--light": DARK_THEME_LIGHT,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom 70%",
            toggleActions: "play reverse play reverse",
        },
    });
}