/**
 * SAMUELDEVANTERY | initHideLoaderOnLoad
 * Fades out the full-page loading cover using GSAP on DOM load, then hides it.
 * @build    25.02.26
 * @updated  19:10 PHT
 */

export function initHideLoaderOnLoad() {
    const cover = document.querySelector('[data-element="loading-cover"]');
    if (!cover || !window.gsap) return;
    gsap.to(cover, {
        opacity: 0,
        delay: 0.25,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
            cover.style.display = 'none';
        },
    });
}