/**
 * SILVER ARROW | initMWG070
 * Pinned horizontal scroll carousel for `.mwg070` media columns (≥480px).
 *
 * @build 01.07.26
 * @author TONYTONY Sàrl
 * @dependencies GSAP (global `gsap`, ScrollTrigger)
 * @consumers main.js (before initArrowStats / initArrowServices / initArrowMap)
 */

export function initMWG070() {
    if (window.innerWidth < 480) return;

    const root = document.querySelector('.mwg070');

    if (!root) return;

    const pinHeight = root.querySelector('.mwg070-pin-height');
    const container = root.querySelector('.mwg070-container');
    const medias = root.querySelectorAll('.mwg070-media');

    if (!pinHeight || !container || !medias.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const animationDistance = document.body.clientWidth + medias[0].clientWidth;

    const n = medias.length;
    const COLS = window.innerWidth <= 768 ? 2 : 4;
    const duration = 1 / n;
    const stagger = window.innerWidth <= 768 ? 0.95 / n : 0.92 / n;

    const master = gsap.timeline({
        scrollTrigger: {
            trigger: pinHeight,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            pin: container,
        },
    });

    medias.forEach((media, i) => {
        const startCol = Math.max(0, COLS - 1 - i);
        const endCol = Math.min(COLS, n - i);

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut', duration },
        });

        if (startCol > 0) {
            tl.fromTo(media, { x: -(startCol / COLS) * animationDistance }, { x: -((startCol + 1) / COLS) * animationDistance });
        } else {
            tl.to(media, { x: -(1 / COLS) * animationDistance });
        }

        for (let col = startCol + 2; col <= endCol; col++) {
            tl.to(media, { x: -(col / COLS) * animationDistance });
        }

        master.add(tl, (i - (COLS - 1)) * stagger + startCol * duration);
    });
}
