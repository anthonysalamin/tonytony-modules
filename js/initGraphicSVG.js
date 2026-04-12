/**
 * TONYTONY | initGraphicSVG
 * Animates circle strokes on every `[data-graphic]` SVG with scrubbed drawSVG timelines tied to scroll.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
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
                end: "bottom 98%",
                markers: false,
                scrub: 0.8,
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