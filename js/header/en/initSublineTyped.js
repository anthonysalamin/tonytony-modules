/**
 * TONYTONY | initSublineTyped
 * Typed.js cycling text with intentional typo correction on "Developer" for playful effect.
 * @build 26.03.26
 * @updated 16:19 PHT
 */

export function initSublineTyped() {
    const el = document.querySelector("[data-id='subline']");
    if (!el) return;

    new Typed(el, {
        strings: ["SEO^1500", "AEO^1500"],
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