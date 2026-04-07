/**
 * TONYTONY | initSwitchTheme
 * Toggles body background and text color on scroll using ScrollTrigger, reversing smoothly on scroll-up.
 * @build 07.04.26
 * @updated 07.04.26 PHT
 */

export function initSwitchTheme() {
    const section = document.querySelector('[data-id="media"]');
    if (!section) return;

    const bodyStyles = getComputedStyle(document.body);
    const originalBg = bodyStyles.backgroundColor;
    const originalColor = bodyStyles.color;

    ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        // markers: true,
        onEnter: () => {
            gsap.to("body", {
                "--background": "#212121",
                "--text": "#ffffff",
                color: "#ffffff",
                backgroundColor: "#212121",
                duration: 1,
                ease: "power2.out",
            });
        },
        onLeaveBack: () => {
            gsap.to("body", {
                "--background": originalBg,
                "--text": originalColor,
                color: originalColor,
                backgroundColor: originalBg,
                duration: 1,
                ease: "power2.out",
            });
        },
    });
}