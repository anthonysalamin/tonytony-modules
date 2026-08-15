/**
 * TONYTONY | initSublineTyped
 * Runs Typed.js on the English subline slot, cycling SEO-style acronyms with tuned typing speeds.
 *
 * @build 12.04.26
 * @updated 16.08.26 PHT
 * @author TONYTONY Sàrl
 * @dependencies Typed.js
 */

export function initSublineTyped() {
    const el = document.querySelector("[data-typed='subline']");
    if (!el) return;

    const PAUSE = 700;

    new Typed(el, {
        strings: ['SEO', 'AEO', 'AI', 'SEA'],
        typeSpeed: 60,
        backSpeed: 30,
        startDelay: 0,
        backDelay: PAUSE,
        smartBackspace: true,
        showCursor: true,
        cursorChar: '_',
        loop: true
    });
}