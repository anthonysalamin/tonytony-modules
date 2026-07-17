/**
 * TONYTONY | initCookieConsent
 * Compact cookie consent banner with translations (en/fr/de), dark mode,
 * and a consent-gating system for third-party scripts tagged
 * <script type="cookie-check">.
 *
 * @build 17.07.26
 * @updated 17.07.26 PHT
 * @author TONYTONY Sàrl
 */

const DARK_MODE = false;
const CONSENT_EVENT_NAME = 'cookieConsentAccepted';
const LANGUAGE = 'en';
const POSITION = 'right';
const POSITIONS = ['left', 'center', 'right'];
const TRANSLATIONS = {
  en: {
    title: 'Cookies consent',
    text: 'We may use cookies to improve performance, measure usage, and personalize your experience. You can accept all cookies or reject non-essential ones.',
    acceptLabel: 'Accept all',
    declineLabel: 'Reject non-essential',
    privacyLabel: 'Privacy policy',
    privacyUrl: '/privacy-policy'
  },
  fr: {
    title: 'Consentement aux cookies',
    text: 'Nous pouvons utiliser des cookies pour améliorer les performances, mesurer l\u2019utilisation et personnaliser votre expérience.',
    acceptLabel: 'Tout accepter',
    declineLabel: 'Refuser les cookies non essentiels',
    privacyLabel: 'Politique de confidentialité',
    privacyUrl: '/privacy-policy'
  },
  de: {
    title: 'Cookie-Einwilligung',
    text: 'Wir verwenden möglicherweise Cookies, um die Leistung zu verbessern, die Nutzung zu messen und Ihr Erlebnis zu personalisieren.',
    acceptLabel: 'Alle akzeptieren',
    declineLabel: 'Nicht notwendige ablehnen',
    privacyLabel: 'Datenschutzrichtlinie',
    privacyUrl: '/privacy-policy'
  }
};

function getLanguage() {
  const match = window.location.pathname.match(/\/(fr|en|de)(?:\/|$)/i);
  if (!match) return LANGUAGE;
  return match[1].toLowerCase();
}

function getTranslation() {
  const language = getLanguage();
  if (!TRANSLATIONS[language]) {
    console.warn('getTranslation: no translation for "' + language + '", falling back to "en"');
    return TRANSLATIONS.en;
  }
  return TRANSLATIONS[language];
}

function getPosition() {
  if (!POSITIONS.includes(POSITION)) {
    console.warn('getPosition: invalid position "' + POSITION + '", falling back to "right"');
    return 'right';
  }
  return POSITION;
}

const COPY = getTranslation();

const OPTIONS = {
  cookieName: 'necessary',
  cookieDuration: 180,
  title: COPY.title,
  text: COPY.text,
  acceptLabel: COPY.acceptLabel,
  declineLabel: COPY.declineLabel,
  privacyLabel: COPY.privacyLabel,
  privacyUrl: COPY.privacyUrl
};

function dispatchConsentAccepted() {
  document.dispatchEvent(new CustomEvent(CONSENT_EVENT_NAME));
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  return document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith(name + '='))
    ?.split('=')[1];
}

function enableConsentScripts() {
  const gatedScripts = document.querySelectorAll('script[type="cookie-check"]');
  if (!gatedScripts.length) {
    console.warn('enableConsentScripts: no [type="cookie-check"] scripts found, skipping');
    return;
  }
  gatedScripts.forEach(oldScript => {
    if (oldScript.dataset.consentActivated) return;
    oldScript.dataset.consentActivated = 'true';

    const newScript = document.createElement('script');
    [...oldScript.attributes].forEach(attr => {
      if (attr.name === 'type' || attr.name === 'cookie-check') return;
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.type = 'text/javascript';
    if (!oldScript.src) newScript.textContent = oldScript.textContent;

    oldScript.replaceWith(newScript);
  });
}

function buildBannerMarkup() {
  return `
    <div class="cookie-header">
      <h3>${OPTIONS.title}</h3>
    </div>

    <p class="cookie-text">${OPTIONS.text}</p>

    <div class="cookie-buttons">
      <button class="cookie-accept" type="button">${OPTIONS.acceptLabel}</button>
      <button class="cookie-decline" type="button">${OPTIONS.declineLabel}</button>
      <a class="cookie-privacy" href="${OPTIONS.privacyUrl}">${OPTIONS.privacyLabel}</a>
    </div>
  `;
}

function buildBannerStyles() {
  return `#cookie-consent-banner{position:fixed;bottom:24px;width:fit-content;min-width:520px;max-width:calc(100vw - 32px);background:rgba(255,255,255,.75);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid #e7e7e7;border-radius:12px;padding:16px 20px;box-shadow:0 16px 40px rgba(0,0,0,.14);z-index:99999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;animation:cookieFadeSide .35s ease}#cookie-consent-banner[data-position="left"]{left:24px}#cookie-consent-banner[data-position="right"]{right:24px}#cookie-consent-banner[data-position="center"]{left:50%;transform:translateX(-50%);animation:cookieFade .35s ease}.cookie-header{display:flex;align-items:center;gap:8px;margin-bottom:8px}.cookie-header h3{margin:0;color:#000;font-size:.95rem;font-weight:700;line-height:1.1}.cookie-text{margin:0;color:#4f4f4f;font-size:13px;line-height:1.6;max-width:480px}.cookie-buttons{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin-top:14px}.cookie-buttons button{flex:0 0 auto;min-width:120px;height:36px;padding:0 16px;white-space:nowrap;border-radius:6px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s ease}.cookie-accept{background:#000;color:#fff;border:none}.cookie-accept:hover{background:#222}.cookie-decline{background:transparent;color:#000;border:1.5px solid #000}.cookie-decline:hover{background:rgba(0,0,0,.05)}.cookie-privacy{flex:0 0 auto;color:#4f4f4f;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap}.cookie-privacy:hover{color:#000;text-decoration:underline}#cookie-consent-banner[data-theme="dark"]{background:rgba(26,26,26,.75);border-color:#2e2e2e;box-shadow:0 16px 40px rgba(0,0,0,.4)}#cookie-consent-banner[data-theme="dark"] .cookie-header h3{color:#fff}#cookie-consent-banner[data-theme="dark"] .cookie-text{color:#bdbdbd}#cookie-consent-banner[data-theme="dark"] .cookie-accept{background:#fff;color:#000}#cookie-consent-banner[data-theme="dark"] .cookie-accept:hover{background:#e2e2e2}#cookie-consent-banner[data-theme="dark"] .cookie-decline{background:transparent;color:#fff;border-color:#fff}#cookie-consent-banner[data-theme="dark"] .cookie-decline:hover{background:#2a2a2a}#cookie-consent-banner[data-theme="dark"] .cookie-privacy{color:#bdbdbd}#cookie-consent-banner[data-theme="dark"] .cookie-privacy:hover{color:#fff}@keyframes cookieFade{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}@keyframes cookieFadeSide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes cookieFadeMobile{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){#cookie-consent-banner,#cookie-consent-banner[data-position]{left:16px;right:16px;bottom:16px;width:auto;transform:none;padding:14px 16px;animation:cookieFadeMobile .35s ease}.cookie-buttons button{flex:1 1 100%}.cookie-privacy{flex:1 1 100%;text-align:center}}`;
}

export function initCookieConsent() {
  if (document.body.dataset.cookieConsentLoaded) {
    console.warn('initCookieConsent: banner already initialized, skipping');
    return;
  }
  document.body.dataset.cookieConsentLoaded = 'true';

  document.addEventListener(CONSENT_EVENT_NAME, enableConsentScripts);

  const existingChoice = getCookie(OPTIONS.cookieName);
  if (existingChoice) {
    if (existingChoice === 'accepted') dispatchConsentAccepted();
    return;
  }

  const banner = document.createElement('div');
  banner.id = 'cookie-consent-banner';
  banner.dataset.position = getPosition();
  if (DARK_MODE) banner.dataset.theme = 'dark';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', OPTIONS.title);
  banner.innerHTML = buildBannerMarkup();

  const style = document.createElement('style');
  style.textContent = buildBannerStyles();

  document.head.appendChild(style);
  document.body.appendChild(banner);

  const acceptBtn = banner.querySelector('.cookie-accept');
  const declineBtn = banner.querySelector('.cookie-decline');

  if (!acceptBtn || !declineBtn) {
    console.warn('initCookieConsent: no consent buttons found, skipping');
    return;
  }

  acceptBtn.addEventListener('click', () => {
    setCookie(OPTIONS.cookieName, 'accepted', OPTIONS.cookieDuration);
    dispatchConsentAccepted();
    banner.remove();
  });

  declineBtn.addEventListener('click', () => {
    setCookie(OPTIONS.cookieName, 'declined', OPTIONS.cookieDuration);
    banner.remove();
  });
}
