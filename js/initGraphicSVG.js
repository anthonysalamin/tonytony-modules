/**
 * TONYTONY | initGraphicSVG
 * Scroll-triggered SVG circle draw animation with scrub, applied to all [data-graphic] elements.
 * @build 28.03.26
 * @updated 15:42 PHT
 */

export function initGraphicSVG() {
    const svgs = document.querySelectorAll("[data-graphic]");
    if (!svgs.length) return;

    svgs.forEach((svg) => {
        const circles = svg.querySelectorAll("circle");
        if (!circles.length) return;

        // Set initial state — fully hidden
        gsap.set(circles, { drawSVG: "0%" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: svg,
                start: "top bottom",
                end: "bottom bottom",
                markers: true,
                scrub: true,
            },
        });

        circles.forEach((circle, i) => {
            tl.to(
                circle,
                {
                    drawSVG: "100%",
                    duration: 1,
                    ease: "none",
                },
                i * 0.3
            );
        });
    });
}