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
    const lightBg = root.getPropertyValue('--light-theme--background').trim();
    const lightText = root.getPropertyValue('--light-theme--text').trim();
    const darkBg = root.getPropertyValue('--dark-theme--background').trim();
    const darkText = root.getPropertyValue('--dark-theme--text').trim();

    console.log(lightBg, lightText, darkBg, darkText);

    gsap.set("body", {
        "--background": lightBg,
        "--text": lightText,
    });

    gsap.to("body", {
        "--background": darkBg,
        "--text": darkText,
        color: darkText,
        backgroundColor: darkBg,
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