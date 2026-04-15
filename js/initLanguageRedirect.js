/**
 * TONYTONY | initLanguageRedirect
 * On page load, redirects first-time visitors to their browser-preferred
 * locale path. Stores choice in sessionStorage to avoid redirect loops
 * and to respect manual language switches.
 *
 * @build 15.04.26
 * @updated 15.04.26 PHT
 * @author TONYTONY Sàrl
 */
export function initLanguageRedirect() {
    const supported = ['fr', 'de'];
    const prefixRegex = new RegExp(`^\\/(${supported.join('|')})(\/|$)`);
    const path = window.location.pathname;

    // Don't redirect if user already has a language prefix in the URL
    if (prefixRegex.test(path)) return;

    // Don't redirect if user has already been redirected or made a manual choice
    if (sessionStorage.getItem('lang-redirected')) return;

    const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();

    // Only redirect for supported non-default languages
    if (!supported.includes(browserLang)) {
        sessionStorage.setItem('lang-redirected', '1');
        return;
    }

    sessionStorage.setItem('lang-redirected', '1');
    window.location.replace(`/${browserLang}${path}`);
}