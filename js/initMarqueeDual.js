/**
 * TONYTONY | initMarqueeDual
 * Scroll-driven dual marquee with opposing horizontal movement, 20% viewport offset padding, and ScrollTrigger scrub.
 * @build 22.03.26
 * @updated 22.03.26
 */

export function initMarqueeDual() {
  // Marquee UP — moves left
  document.querySelectorAll('[data-marquee="up"]').forEach((el) => {
    const scrollDistance = el.scrollWidth - el.offsetWidth;
    const offset = el.scrollWidth * 0.2;

    gsap.set(el, {
      x: offset,
    });

    gsap.to(el, {
      x: -(scrollDistance + offset),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  // Marquee DOWN — moves right
  document.querySelectorAll('[data-marquee="down"]').forEach((el) => {
    const scrollDistance = el.scrollWidth - el.offsetWidth;
    const offset = el.scrollWidth * 0.2;

    gsap.set(el, {
      x: -(scrollDistance + offset),
    });

    gsap.to(el, {
      x: offset,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: true,
        invalidateOnRefresh: true,
      },
    });
  });
}