/**
 * TONYTONY | initSwitchTheme
 * Toggles body background and text color on scroll using ScrollTrigger, reversing smoothly on scroll-up.
 * @build 07.04.26
 * @updated 07.04.26 PHT
 */

/*
export function initSwitchTheme() {
    const section = document.querySelector('[data-section="case-study"]');
    if (!section) return;

    gsap.to("body", {
        backgroundColor: "#212121 !important",
        color: "#ffffff",
        duration: 1,
        ease: "power2.out",
        markers: true,
        scrollTrigger: {
            trigger: section,
            start: "bottom 70%",
            toggleActions: "play none none reverse",
        },
    });
}
*/


export function initSwitchTheme() {
    const section = document.querySelector('[data-section="case-study"]');
    if (!section) return;

    ScrollTrigger.create({
        trigger: section,
        start: "bottom 70%",
        markers: true,
        onEnter: () => {
            gsap.to("body", {
                "--background": "#212121",
                "--dark": "#ffffff",
                color: "#ffffff",
                backgroundColor: "#212121",
                duration: 1,
                ease: "power2.out",
            });
        },
        onLeaveBack: () => {
            gsap.to("body", {
                "--background": "",
                "--dark": "",
                color: "",
                backgroundColor: "",
                duration: 1,
                ease: "power2.out",
            });
        },
    });
}