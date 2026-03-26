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
        strings: ["Partner^1500", "Develoope^100", "Developer^1500"],
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