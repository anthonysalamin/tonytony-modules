/**
 * PORTFOLIO | initNavigation
 * Toggles a mobile navigation menu with animated burger icon and disables/enables smooth scroll.
 * @build 12.04.26
 * @updated 12.04.26 PHT
*/

export function initNavigation() {
    let isOpen = false;

    const burger = document.querySelector(`[data-menu="embed"]`);
    const svgElement = document.querySelector(`[data-menu="burger"]`);
    const menu = document.querySelector(`[data-menu="menu"]`);
    const links = document.querySelectorAll(`[data-menu="link"]`);

    if (!burger) return;

    function openMenu() {
        gsap.to(menu, { x: "0%", duration: 0.5 });

        // dynamically grab Lenis instance
        const lenis = window.lenis__pageScroll;
        if (lenis) lenis.stop(); // stop smooth scroll

        // freeze native scroll
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none"; // stops touch scroll on mobile
    }

    function closeMenu() {
        gsap.to(menu, { x: "100%", duration: 0.5 });

        const lenis = window.lenis__pageScroll;
        if (lenis) lenis.start(); // resume smooth scroll

        // re-enable native scroll
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
    }

    function handleMenuAndLinks() {
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
    }

    // Only enable mobile navigation below 991px
    if (window.innerWidth < 991) {
        handleMenuAndLinks();
    }

    // Optional: re-check on resize to attach/detach events
    window.addEventListener("resize", () => {
        if (window.innerWidth < 991 && !burger.dataset.mobileInit) {
            handleMenuAndLinks();
            burger.dataset.mobileInit = "true";
        } else if (window.innerWidth >= 991 && burger.dataset.mobileInit) {
            // Reset menu if resizing to desktop
            closeMenu();
            burger.dataset.mobileInit = "";
        }
    });
}