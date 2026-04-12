/**
 * TONYTONY | initMarqueeDualHorizontal
 * Scrubs opposing horizontal marquee tracks with padded start positions so they drift across the viewport.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initMarqueeDualHorizontal() {
  const vw = document.documentElement.clientWidth;
  const offset = vw * 0.2;
  const scrub = 0.6;

  // Marquee UP — moves left
  document.querySelectorAll('[data-marquee="up"]').forEach((el) => {
    // gsap.set(el, { willChange: "transform" });
    const naturalLeft = el.getBoundingClientRect().left;

    gsap.fromTo(
      el,
      { x: offset },
      {
        x: vw - naturalLeft - el.scrollWidth - offset,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: scrub,
          // markers: true,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  // Marquee DOWN — moves right
  document.querySelectorAll('[data-marquee="down"]').forEach((el) => {
    // gsap.set(el, { willChange: "transform" });
    const naturalLeft = el.getBoundingClientRect().left;

    gsap.fromTo(
      el,
      { x: -(naturalLeft + el.scrollWidth - vw + offset) },
      {
        x: offset - naturalLeft,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: scrub,
          // markers: true,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}
