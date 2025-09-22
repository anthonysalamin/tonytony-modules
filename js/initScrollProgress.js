/**
 * UTILITY | initScrollProgress
 * @build 20.01.25 @updated 17:07 PHT
 */

export function initScrollProgress({
    position = "left",
    breakpoint = 768,
    hideAtPercentage = 0.9
} = {}) {
    if (isMobileDevice(breakpoint)) return;

    injectCSS(position);
    injectHTML(hideAtPercentage);

    // -------------------------
    function showOnScroll() {
        const wrap = document.querySelector(".progress-wrap");
        if (!wrap) return;

        const path = wrap.querySelector("path");
        const length = path.getTotalLength();

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
            strokeDashoffset: 0,
            scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true }
        });

        gsap.to(wrap, {
            autoAlpha: 1,
            scrollTrigger: { trigger: document.body, start: "top+=50px top", toggleClass: { targets: wrap, className: "active-progress" }, once: false }
        });

        wrap.addEventListener("click", e => {
            e.preventDefault();
            gsap.to(window, { scrollTo: 0, duration: 0.55, ease: "power2.out" });
        });
    }

    function isMobileDevice(width) {
        return window.innerWidth < width;
    }

    function injectCSS(side) {
        const css = `
  .progress-wrap{
    --indicator-progress-color: rgba(255, 255, 255, 1);
    --indicator-slide-color: rgba(255, 255, 255, .1);
    --indicator-font: "Unicons";
    --indicator-content: "\\e84b";
    --indicator-hover: white;
    --indicator-position: 1.25rem;
  }
  @font-face{
    font-family: "Unicons";
    src: url("https://uploads-ssl.webflow.com/61a0f086f2b1f289503a4957/6329d8e0a1790e3283ae2504_unicons.woff") format("woff");
    font-weight: 400; font-style: normal; font-display: swap;
  }
  .progress-wrap{
    position: fixed;
    mix-blend-mode: difference;
    ${side}: 1.5rem;
    bottom: 1.5rem;
    height: 46px; width: 46px;
    cursor: pointer;
    display: none;
    border-radius: 50px;
    box-shadow: inset 0 0 0 2px var(--indicator-slide-color);
    z-index: 10000;
    opacity: 0; visibility: hidden;
    transform: translateY(15px);
    transition: all 200ms linear;
  }
  .progress-wrap.active-progress{
    display: block;
    transition: 1s;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .progress-wrap::after,.progress-wrap::before{
    position: absolute;
    font-family: var(--indicator-font);
    content: var(--indicator-content);
    text-align: center;
    line-height: 46px;
    font-size: 24px;
    left: 0; top: 0;
    height: 46px; width: 46px;
    cursor: pointer;
    display: block;
    transition: all 200ms linear;
  }
  .progress-wrap::after{
    color: var(--indicator-progress-color);
    z-index: 1;
  }
  .progress-wrap:hover::before{
    color: var(--indicator-hover);
    transform: scale(1.0);
    transform-origin: center;
  }
  .progress-wrap:hover::after{
    transform: scale(1.15);
    transform-origin: center;
  }
  .progress-wrap svg path{
    fill: none;
  }
  .progress-wrap svg.progress-circle path{
    stroke: var(--indicator-progress-color);
    stroke-width: 4;
    box-sizing: border-box;
    transition: all 200ms linear;
  }`;
        const style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    function injectHTML(hideThreshold) {
        document.body.insertAdjacentHTML(
            "afterbegin",
            `<div class="progress-wrap">
          <svg class="progress-circle" height="100%" viewBox="-1 -1 102 102" width="100%">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
          </svg>
        </div>`
        );
        showOnScroll();
        hideOnFooter(hideThreshold);
    }

    function hideOnFooter(threshold) {
        const wrap = document.querySelector(".progress-wrap");
        if (!wrap) return;

        window.addEventListener("scroll", () => {
            const scroll = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            gsap.to(wrap, {
                opacity: scroll / (docHeight - winHeight) >= threshold ? 0 : 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }
}