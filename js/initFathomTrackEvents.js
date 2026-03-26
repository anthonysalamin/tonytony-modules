/**
 * TONYTONY | initFathomTrackEvents
 * Track click and form submit events via Fathom using data attributes and form targeting.
 * @build 26.03.26
 * @updated 18:02 CET
 */
export function initFathomTrackEvent() {
    window.addEventListener('load', () => {
      // Button tracking
      const btn = document.querySelector('[data-trackevent="btn-free-seo-audit"]');
      if (btn) {
        btn.addEventListener('click', () => {
          fathom.trackEvent('home contact click');
        });
      }
  
      // Form tracking
      const form = document.getElementById('id-of-your-form');
      if (form) {
        form.addEventListener('submit', () => {
          fathom.trackEvent('form submit');
        });
      }
    });
  }