/**
 * TONYTONY | 🥭 handleWebflowBadgeScrollGSAP
 * Moves the Webflow badge out on scroll down and restores it on scroll up using GSAP
 *
 * @build 2026-05-06
 * @updated 2026-05-06 PHT
 * @author TONYTONY Sàrl
 */

export function initWebflowBadge() {
  const OPTIONS = {
    badge: document.querySelector('[data-id="webflow-badge"]'),
    duration: 0.3,
    ease: "power2.out"
  };

  if (!OPTIONS.badge) {
    console.warn('[handleWebflowBadgeScrollGSAP] Badge element not found');
    return;
  }

  let lastScrollY = window.scrollY;
  let isHidden = false;

  function hideBadge() {
    if (isHidden) return;
    isHidden = true;

    gsap.to(OPTIONS.badge, {
      x: "100%",
      opacity: 0,
      duration: OPTIONS.duration,
      ease: OPTIONS.ease
    });
  }

  function showBadge() {
    if (!isHidden) return;
    isHidden = false;

    gsap.to(OPTIONS.badge, {
      x: "0%",
      opacity: 1,
      duration: OPTIONS.duration,
      ease: OPTIONS.ease
    });
  }

  function onScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      hideBadge(); // 👇 scrolling down
    } else {
      showBadge(); // 👆 scrolling up
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}