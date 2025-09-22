/**
 * PORTFOLIO | navigation v5
 * @build 22.09.25 @updated 16:40 PHT
 * Toggles a mobile navigation menu with animated burger icon and disables/enables smooth scroll.
 */

export function initNavigation() {
    let isOpen = false;

    const burger = document.querySelector(`[data-id="burger"]`);
    if (!burger) return;

    const menu = document.querySelector(`[data-id="menu"]`);
    const links = document.querySelectorAll(`[data-id="navbar-link"]`);
    const svgElement = document.querySelector(".burger-rotate");

    function openMenu() {
        gsap.to(menu, { x: "0%", duration: 0.5 });

        const lenis = window.lenis__pageScroll;
        if (lenis) lenis.stop();

        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
    }

    function closeMenu() {
        gsap.to(menu, { x: "100%", duration: 0.5 });

        const lenis = window.lenis__pageScroll;
        if (lenis) lenis.start();

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
                closeMenu();
                burger.click(); // closes burger state
            });
        });
    }

    if (window.innerWidth < 991) {
        handleMenuAndLinks();
    }
}