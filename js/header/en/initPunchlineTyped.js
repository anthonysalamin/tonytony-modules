/**
 * TONYTONY | initPunchlineTyped
 * Runs Typed.js on the punchline element with deliberate typo beats for the Developer/Partner strings.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initPunchlineTyped() {
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