/**
 * TONYTONY | initNavigation
 * Toggles the mobile navigation menu with an animated burger icon while pausing Lenis and native scroll.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initNavigation() {
    let isOpen = false;
    let isInitialized = false;

    const burger = document.querySelector(`[data-menu="embed"]`);
    const svgElement = document.querySelector(`[data-menu="burger"]`);
    const menu = document.querySelector(`[data-menu="menu"]`);
    const nav = document.querySelector(`[data-id="nav"]`);
    const links = document.querySelectorAll(`[data-menu="link"]`);

    if (!burger) return;

    function openMenu() {
        // Ensure the fixed nav is visible before opening the slide-out menu.
        if (nav) gsap.set(nav, { yPercent: 0 });
        gsap.to(menu, { x: "0%", duration: 0.5 });
        document.documentElement.dataset.mobileMenuOpen = "true";

        // dynamically grab Lenis instance
        const lenis = window.lenis__pageScroll;
        if (lenis) lenis.stop(); // stop smooth scroll

        // freeze native scroll
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none"; // stops touch scroll on mobile
    }

    function closeMenu() {
        gsap.to(menu, { x: "100%", duration: 0.5 });
        delete document.documentElement.dataset.mobileMenuOpen;

        const lenis = window.lenis__pageScroll;
        if (lenis) lenis.start(); // resume smooth scroll

        // re-enable native scroll
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
    }

    function handleMenuAndLinks() {
        if (isInitialized) return;

        burger.addEventListener("click", () => {
            svgElement.classList.toggle("active");

            if (!isOpen) {
                openMenu();
            } else {
                closeMenu();
            }

            isOpen = !isOpen;
        });

        links.forEach((navLink) => {
            navLink.addEventListener("click", () => {
                if (!isOpen) return;
                closeMenu();
                svgElement?.classList.remove("active");
                isOpen = false;
            });
        });

        isInitialized = true;
    }

    // Only enable mobile navigation below 991px
    if (window.innerWidth < 991) {
        handleMenuAndLinks();
    }

    // Optional: re-check on resize to attach/detach events
    window.addEventListener("resize", () => {
        if (window.innerWidth < 991 && !isInitialized) {
            handleMenuAndLinks();
        } else if (window.innerWidth >= 991 && isInitialized) {
            // Reset menu if resizing to desktop
            if (isOpen) closeMenu();
            isOpen = false;
            svgElement?.classList.remove("active");
            isInitialized = false;
        }
    });
}