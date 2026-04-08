/**
 * TONYTONY | initMarqueeDualHorizontal
 * Scroll-driven dual marquee with opposing horizontal movement, 20vw offset padding, and ScrollTrigger scrub.
 * @build 22.03.26
 * @updated 27.03.26
 */

export function initMarqueeDualHorizontal() {
  const offset = window.innerWidth * 0.2;

  // Marquee UP — moves left
  document.querySelectorAll('[data-marquee="up"]').forEach((el) => {
    const scrollDistance = el.scrollWidth - el.offsetWidth;

    gsap.fromTo(
      el,
      { x: offset },
      {
        x: -(scrollDistance + offset),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: true,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  // Marquee DOWN — moves right
  document.querySelectorAll('[data-marquee="down"]').forEach((el) => {
    const scrollDistance = el.scrollWidth - el.offsetWidth;

    gsap.fromTo(
      el,
      { x: -(scrollDistance + offset) },
      {
        x: offset,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}