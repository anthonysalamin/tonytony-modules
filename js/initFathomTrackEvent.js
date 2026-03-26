/**
 * TONYTONY | initFathomTrackEvent
 * Track click events via Fathom using data attributes for flexible targeting.
 * @build 26.03.26
 * @updated 18:00 CET
 */
export function initFathomTrackEvent() {
    window.addEventListener('load', () => {
      const btn = document.querySelector('[data-trackevent="btn-free-seo-audit"]');
      if (!btn) return;
  
      btn.addEventListener('click', () => {
        fathom.trackEvent('home contact click');
      });
    });
  }