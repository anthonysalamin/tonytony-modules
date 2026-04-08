/**
 * TONYTONY | initMarqueeDualHorizontal
 * Scroll-driven dual marquee with opposing horizontal movement, 20vw offset padding, and ScrollTrigger scrub.
 * @build 22.03.26
 * @updated 27.03.26
 */

export function initMarqueeDualHorizontal() {
  const vw = document.documentElement.clientWidth;
  const offset = vw * 0.2;

  // Marquee UP — moves left
  document.querySelectorAll('[data-marquee="up"]').forEach((el) => {
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
          scrub: 0.5, // true
          invalidateOnRefresh: true,
        },
      }
    );
  });

  // Marquee DOWN — moves right
  document.querySelectorAll('[data-marquee="down"]').forEach((el) => {
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
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}
