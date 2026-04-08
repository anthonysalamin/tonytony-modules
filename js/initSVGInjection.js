/**
 * TONYTONY | initSVGInjection
 * *
 * Injects inline SVG from data attributes and removes element background color.
 * *
 * @build 08.04.26
 * @updated 08.04.26 PHT
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