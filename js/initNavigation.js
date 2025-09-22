/**
 * PORTFOLIO | navigation v5
 * @build 22.09.25 @updated 16:40 PHT
 */

export function initNavigation() {
    let isOpen = false;

    const burger = document.querySelector(`[data-id="burger"]`);
    if (!burger) return;

    const menu = document.querySelector(`[data-id="menu"]`);
    const links = document.querySelectorAll(`[data-id="navbar-link"]`);
    const svgElement = document.querySelector(".burger-rotate");

    // 🔑 Access the Lenis instance (assuming it's initialized globally)
    const lenis = window.lenis;

    function openMenu() {
        gsap.to(menu, { x: "0%", duration: 0.5 });
        if (lenis) lenis.stop(); // 🚫 disable scroll
    }

    function closeMenu() {
        gsap.to(menu, { x: "100%", duration: 0.5 });
        if (lenis) lenis.start(); // ✅ enable scroll
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