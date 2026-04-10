/**
 * TONYTONY | initFathomTrackEvents
 * Track click and form submit events via Fathom using data attributes.
 * @build 26.03.26
 * @updated 18:02 CET
 */

export function initFathomTrackEvents() {
  // buttons
  const trackClick = (selector, eventName) => {
    const el = document.querySelector(selector);
    if (el) el.addEventListener('click', () => fathom.trackEvent(eventName));
  };

  // forms
  const trackSubmit = (selector, eventName) => {
    const el = document.querySelector(selector);
    if (el) el.addEventListener('submit', () => fathom.trackEvent(eventName));
  };

  trackClick('[data-event="CTA navbar Get in touch"]', 'CTA navbar Get in touch clicked');
  trackClick('[data-event="CTA navbar Book a call"]', 'CTA navbar Book a call clicked');
  trackSubmit('[data-basin-form="true"]', 'contact form submitted');

}
