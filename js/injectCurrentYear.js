/**
 * TONYTONY | injectCurrentYear
 * Writes the current calendar year into the first `[data-id="year"]` element when present.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function injectCurrentYear() {
    const year = new Date().getFullYear();
    const el = document.querySelector('[data-id="year"]');
    if (el) el.textContent = year;
}