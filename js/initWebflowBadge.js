/**
 * TONYTONY | 🥭 initWebflowBadge
 * Moves the Webflow badge out on scroll down and restores it on scroll up using GSAP
 *
 * @build 2026-05-06
 * @updated 2026-05-07 PHT
 * @author TONYTONY Sàrl
 */

export function initWebflowBadge() {
    const OPTIONS = {
        badge: document.querySelector('[data-id="webflow-badge"]'),
        duration: 0.3,
        ease: "power2.out",
        scrollThreshold: 100
    };

    if (!OPTIONS.badge) {
        console.warn('[initWebflowBadge] Badge element not found');
        return;
    }

    let lastScrollY = window.scrollY;
    let accumulatedScroll = 0;
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
            x: getOffsetX(),
            opacity: 0,
            duration: OPTIONS.duration,
            ease: "back.in(1.7)"
        });
    }

    function showBadge() {
        if (!isHidden) return;

        isHidden = false;

        gsap.to(OPTIONS.badge, {
            x: 0,
            opacity: 1,
            duration: OPTIONS.duration,
            ease: OPTIONS.ease
        });
    }

    function onScroll() {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        accumulatedScroll += delta;

        // 👇 Trigger only after scrolling enough downward
        if (accumulatedScroll >= OPTIONS.scrollThreshold) {
            hideBadge();
            accumulatedScroll = 0;
        }

        // 👇 Trigger only after scrolling enough upward
        if (accumulatedScroll <= -OPTIONS.scrollThreshold) {
            showBadge();
            accumulatedScroll = 0;
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
}
