/**
 * TONYTONY | 🥭 initWebflowBadge
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
        delay: 0.2,
        ease: "power2.out"
    };

    if (!OPTIONS.badge) {
        console.warn('[initWebflowBadge] Badge element not found');
        return;
    }

    let lastScrollY = window.scrollY;
    let isHidden = false;

    function getOffsetX() {
        const styles = window.getComputedStyle(OPTIONS.badge);
        const right = parseFloat(styles.right) || 0;
        const width = OPTIONS.badge.offsetWidth;

        return width + right;
    }

    function hideBadge() {
        if (isHidden) return;
        isHidden = true;

        gsap.to(OPTIONS.badge, {
            x: getOffsetX(), // 👈 dynamic distance
            opacity: 0,
            duration: OPTIONS.duration,
            delay: OPTIONS.delay,
            ease: OPTIONS.ease
        });
    }

    function showBadge() {
        if (!isHidden) return;
        isHidden = false;

        gsap.to(OPTIONS.badge, {
            x: 0,
            opacity: 1,
            duration: OPTIONS.duration,
            delay: OPTIONS.delay,
            ease: OPTIONS.ease
        });
    }

    function onScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            hideBadge();
        } else {
            showBadge();
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
}