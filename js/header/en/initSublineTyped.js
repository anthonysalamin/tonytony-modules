/**
 * TONYTONY | initSublineTyped
 * Runs Typed.js on the English subline slot, cycling SEO-style acronyms with tuned typing speeds.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initSublineTyped() {
    const el = document.querySelector("[data-typed='subline']");
    if (!el) return;

    new Typed(el, {
        strings: ["SEO^1500", "AEO^1500", "CRO^1500", "AI^1500"],
        typeSpeed: 60,
        backSpeed: 30,
        startDelay: 0,
        backDelay: 0,
        smartBackspace: true,
        showCursor: true,
        cursorChar: '_',
        loop: true
    });
}