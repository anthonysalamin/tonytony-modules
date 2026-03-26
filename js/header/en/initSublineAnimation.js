/**
 * TONYTONY | initSublineAnimation
 * Typed.js cycling text with intentional typo correction on "Developer" for playful effect.
 * @build 30.03.25
 * @updated 23:xx PHT
 */

export function initSublineAnimation() {
    const el = document.querySelector("[data-id='punchline']");
    if (!el) return;

    new Typed(el, {
        strings: [
            'Develoo^400\b\boper',
            'Partner'
        ],
        typeSpeed: 45,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        showCursor: false
    });
}