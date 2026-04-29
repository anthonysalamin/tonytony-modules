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
    if (!cover) return;

    let forceHideTimerId = null;

    const hideImmediately = () => {
        if (forceHideTimerId) {
            clearTimeout(forceHideTimerId);
            forceHideTimerId = null;
        }

        cover.style.opacity = '0';
        cover.style.display = 'none';
    };

    const hideCover = () => {
        if (forceHideTimerId) clearTimeout(forceHideTimerId);

        // Fail-safe: never leave the loading cover stuck on screen.
        forceHideTimerId = setTimeout(hideImmediately, 2500);

        if (!window.gsap) {
            hideImmediately();
            return;
        }

        gsap.to(cover, {
            opacity: 0,
            delay: 0.15,
            duration: 0.75,
            ease: 'power2.out',
            onComplete: hideImmediately,
        });
    };

    hideCover();

    window.addEventListener('pageshow', (e) => {
        if (e.persisted) hideCover();
    });
}