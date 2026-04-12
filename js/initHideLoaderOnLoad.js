/**
 * TONYTONY | initHideLoaderOnLoad
 * Fades out the loading cover on load with GSAP and re-runs the hide when pages are restored from bfcache.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initHideLoaderOnLoad() {
    const cover = document.querySelector('[data-element="loading-cover"]');
    if (!cover || !window.gsap) return;

    const hideCover = () => {
        gsap.to(cover, {
            opacity: 0,
            delay: 0.15,
            duration: 0.75,
            ease: 'power2.out',
            onComplete: () => {
                cover.style.display = 'none';
            },
        });
    };

    hideCover();

    window.addEventListener('pageshow', (e) => {
        if (e.persisted) hideCover();
    });
}