/**
 * TONYTONY | initPageTransitions
 * Shows loading cover on transition link clicks.
 * @build    06.04.26
 * @updated  10:28 PHT
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