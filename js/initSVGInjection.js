export function initSVGInjection() {
    document.querySelectorAll('[data-svg]').forEach((el) => {
      const svgData = el.getAttribute('data-svg');
      if (svgData) {
        el.innerHTML = svgData;
      }
    });
  }