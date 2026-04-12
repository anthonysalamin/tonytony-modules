/**
 * TONYTONY | initFathomTrackEvents
 * Registers Fathom `trackEvent` calls for configured buttons and Basin form submissions when nodes exist.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
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
