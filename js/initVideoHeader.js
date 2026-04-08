/**
 * TONYTONY | initVideoHeader
 * Pauses hero videos when offscreen, resumes on re-entry.
 * @build 08.04.26
 */

export function initVideoHeader() {
    const videos = document.querySelectorAll('video[data-video="header"]');

    if (!videos.length) return;

    videos.forEach((video) => {
        ScrollTrigger.create({
            trigger: video,
            start: "top bottom",
            end: "bottom top",
            onLeave: () => video.pause(),
            onEnterBack: () => video.play(),
        });
    });
}