/**
 * TONYTONY | initHideLoaderOnLoad
 * Fades out the loading cover on load with GSAP. Polls briefly for GSAP if not yet available, and re-runs the hide when pages are restored from bfcache.
 *
 * @build 12.04.26
 * @updated 29.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initHideLoaderOnLoad() {
    const cover = document.querySelector('[data-element="loading-cover"]');
    if (!cover) {
        console.warn('initHideLoaderOnLoad: no [data-element="loading-cover"] found, skipping');
        return;
    }

    const hideImmediately = () => {
        cover.style.opacity = '0';
        cover.style.display = 'none';
    };

    const animateHide = () => {
        gsap.to(cover, {
            opacity: 0,
            delay: 0.15,
            duration: 0.75,
            ease: 'power2.out',
            onComplete: hideImmediately,
        });
    };

    const hideCover = () => {
        if (window.gsap) {
            animateHide();
            return;
        }

        // Poll for GSAP — try every 100ms for up to 1.5s, then give up and hide immediately.
        let attempts = 0;
        const maxAttempts = 15;
        const intervalId = setInterval(() => {
            attempts++;
            if (window.gsap) {
                clearInterval(intervalId);
                animateHide();
            } else if (attempts >= maxAttempts) {
                clearInterval(intervalId);
                console.warn('initHideLoaderOnLoad: GSAP not available after 1.5s, hiding without animation');
                hideImmediately();
            }
        }, 100);
    };

    hideCover();

    window.addEventListener('pageshow', (e) => {
        if (e.persisted) hideCover();
    });
}