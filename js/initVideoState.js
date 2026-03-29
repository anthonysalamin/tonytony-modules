/**
 * TONYTONY | initVideoState
 * GSAP ScrollTrigger-powered video lifecycle manager with viewport-based play/pause,
 * lazy-loaded sources, and aggressive memory cleanup for media-heavy pages.
 * @build 26.03.26
 * @updated 16:00 PHT
 */

export function initVideoState() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const videos = document.querySelectorAll('[data-video="header"]');
    if (!videos.length) return;

    videos.forEach((video) => {
        const source = video.querySelector('source');
        if (!source) return;

        // Store original src
        if (!source.dataset.src) {
            source.dataset.src = source.src;
        }

        // Prevent initial loading
        source.removeAttribute('src');
        video.load();

        video.muted = true;
        video.playsInline = true;
        video.preload = 'none';

        ScrollTrigger.create({
            trigger: video,
            start: 'top bottom',
            end: 'bottom top',

            onEnter: () => {
                if (!source.src && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                }

                video.play().catch(() => { });
            },

            onEnterBack: () => {
                if (!source.src && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                }

                video.play().catch(() => { });
            },

            onLeave: () => {
                video.pause();
                video.currentTime = 0;

                // aggressive cleanup
                source.removeAttribute('src');
                video.load();
            },

            onLeaveBack: () => {
                video.pause();
                video.currentTime = 0;

                source.removeAttribute('src');
                video.load();
            }
        });
    });

    ScrollTrigger.refresh();
}