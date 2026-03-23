/**
 * TONYTONY | initNavBarDisplay
 * GSAP ScrollTrigger nav hide/show — slides nav up on scroll down (after 50vh), reverses on scroll up.
 * @build 23.03.26
 * @updated 00:00 PHT
 */

export function initNavBarDisplay() {
  const nav = document.querySelector('[data-id="nav"]');
  if (!nav) return;

  let isHidden = false;
  const threshold = window.innerHeight * 0.65;

  const tl = gsap.timeline({ paused: true });
  tl.to(nav, {
    yPercent: -105,
    duration: 0.4,
    ease: "power2.inOut",
  });

  ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: (self) => {
      const currentScrollY = self.scroll();
      const direction = self.direction;

      if (direction === 1 && currentScrollY > threshold && !isHidden) {
        tl.play();
        isHidden = true;
      } else if (direction === -1 && isHidden) {
        tl.reverse();
        isHidden = false;
      }
    },
  });
}