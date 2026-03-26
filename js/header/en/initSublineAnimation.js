/**
 * TONYTONY | initSublineAnimation
 * Typed.js cycling text with intentional typo correction on "Developer" for playful effect.
 * @build 26.03.26
 * @updated 16:19 PHT
 */

export function initSublineAnimation() {
    const el = document.querySelector("[data-id='punchline']");
    if (!el) return;

    new Typed(el, {
        strings: [
            'Partner',
            'Develoo^500\b\boper'
        ],
        typeSpeed: 45,
        backSpeed: 30,
        startDelay: 1500,
        backDelay: 1500,
        loop: true,
        smartBackspace: false,
        showCursor: false
    });
}