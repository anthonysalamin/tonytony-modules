/**
 * TONYTONY | initNavBarDisplay
 * Uses ScrollTrigger velocity to slide `[data-id="nav"]` upward after scrolling down and restore it on upward motion.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initNavBarDisplay() {
  const nav = document.querySelector('[data-id="nav"]');
  if (!nav) return;

  let isHidden = false;
  const threshold = window.innerHeight * 0.1;

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
      const isMobileMenuOpen = document.documentElement.dataset.mobileMenuOpen === "true";
      if (isMobileMenuOpen) {
        if (isHidden) {
          tl.reverse();
          isHidden = false;
        }
        return;
      }

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