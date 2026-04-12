/**
 * TONYTONY | initDrawCheck
 * Loops a GSAP drawSVG timeline on `.svg-check` with a brief pause before each yoyo repeat.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initDrawCheck() {
    if (!document.querySelector(`.svg-check`)) return;

    const options = { repeat: -1, repeatDelay: 0, yoyo: true };
    const timeline = gsap.timeline(options);

    gsap.set(".svg-check", { drawSVG: "0%" });

    function pauseBeforeYoyo() {
        timeline.pause();
        setTimeout(() => {
            timeline.play();
        }, 2500);
    }

    function drawCheck() {
        timeline.to(".svg-check", {
            duration: 1,
            drawSVG: "100%",
            ease: "power3.out",
            onComplete: pauseBeforeYoyo
        });
    }

    drawCheck();
}