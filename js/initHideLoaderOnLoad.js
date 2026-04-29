/**
 * TONYTONY | initHideLoaderOnLoad
 * Fades out the loading cover on load with GSAP. Polls briefly for GSAP if not yet available, throws if it never arrives. Re-runs on bfcache restore.
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

    const animateHide = () => {
        // Reset state in case we're hiding again after bfcache restore
        cover.style.display = 'flex';
        cover.style.opacity = '1';

        gsap.to(cover, {
            opacity: 0,
            delay: 0.05,
            duration: 0.55,
            ease: 'power2.out',
            onComplete: () => {
                cover.style.display = 'none';
            },
        });
    };

    const hideCover = () => {
        if (window.gsap) {
            animateHide();
            return;
        }

        let attempts = 0;
        const maxAttempts = 15;
        const intervalId = setInterval(() => {
            attempts++;
            if (window.gsap) {
                clearInterval(intervalId);
                animateHide();
            } else if (attempts >= maxAttempts) {
                clearInterval(intervalId);
                throw new Error('initHideLoaderOnLoad: GSAP not available after 1.5s');
            }
        }, 100);
    };

    hideCover();

    // make sure it runs again on bfcache restore
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) hideCover();
    });
}