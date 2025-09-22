/**
 * PORTFOLIO | initDrawCheck
 * @build 02.02.2024 @updated 17:12 Hong Kong
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