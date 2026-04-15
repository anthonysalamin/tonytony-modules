/**
 * TONYTONY | initLanguageSwitch
 * Handles language switching by redirecting to the corresponding localized
 * path based on the current slug and the selected data-language attribute.
 *
 * @build 15.04.26
 * @updated 15.04.26 PHT
 * @author TONYTONY Sàrl
 */
export function initLanguageSwitch() {
    const supported = ['fr', 'de'];
    const prefixRegex = new RegExp(`^\\/(${supported.join('|')})(\/|$)`, '');
    const switches = document.querySelectorAll('a[data-language]');
    if (!switches.length) return;
  
    switches.forEach((el) => {
      const lang = el.getAttribute('data-language');
      const path = window.location.pathname;
      const stripped = path.replace(prefixRegex, '/');
      const newPath = lang === 'en' ? stripped : `/${lang}${stripped}`;
  
      // Set the href so crawlers and right-click "open in new tab" work
      el.setAttribute('href', newPath);
  
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = newPath;
      });
    });
  }