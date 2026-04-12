/**
 * TONYTONY | initPageTransitions
 * Intercepts `[data-link="transition"]` anchors, fades the loading cover in, then navigates to the requested URL.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initPageTransitions() {
    const cover = document.querySelector('[data-element="loading-cover"]');
    if (!cover || !window.gsap) return;

    document.querySelectorAll('[data-link="transition"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (!href) return;
            cover.style.display = 'flex';
            gsap.fromTo(cover, { opacity: 0 }, {
                opacity: 1,
                duration: 0.35,
                ease: 'power2.in',
                onComplete: () => {
                   window.location.href = href;
                   console.log('transition complete');
                },
            });
        });
    });
}