/**
 * TONYTONY | initSwitchTheme
 * Tweaks body CSS variables between light and dark theme tokens while scrolling through the media section.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initSwitchTheme() {
    const section = document.querySelector('[data-id="media"]');
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
            start: "top 70%",
            end: "bottom 80%",
            toggleActions: "play reverse play reverse",
        },
    });
}