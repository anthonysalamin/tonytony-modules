/**
 * UTILITY | injectCurrentYear
 * @build 25.10.24 @updated 18:02 PHT
 */

export function injectCurrentYear() {
    const year = new Date().getFullYear();
    const el = document.querySelector('[data-id="year"]');
    if (el) el.textContent = year;
}