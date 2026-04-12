/**
 * TONYTONY | initSVGInjection
 * Replaces each `[data-svg]` node's inner HTML with its SVG payload and clears the placeholder background.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initSVGInjection() {
    document.querySelectorAll('[data-svg]').forEach((el) => {
      const svgData = el.getAttribute('data-svg');
      if (svgData) {
        el.innerHTML = svgData;
        el.style.backgroundColor = 'transparent'; // remove background color placeholder from WF
      }
    });
  }