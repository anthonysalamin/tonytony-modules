/**
 * TONYTONY | initVideoHeader
 * Pauses hero videos when offscreen, resumes on re-entry.
 * @build 08.04.26
 */

export function initVideoHeader() {
    const container = document.querySelector('[data-video="hero-container"]');
    if (!container) return;

    const videos = container.querySelectorAll('video[data-video="hero"]');

    ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom 10%",
        markers: true,
        onLeave: () => videos.forEach((v) => v.pause()),
        onEnterBack: () => videos.forEach((v) => v.play()),
    });
}