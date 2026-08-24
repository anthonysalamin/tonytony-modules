/**
 * TONYTONY | initLanguageSwitcherBtn
 * Reproduces the Webflow "language show" interaction: clicking
 * `.language__trigger` animates the sibling `.language__wrap`
 * from width 0 / opacity 0 to auto width / opacity 1.
 *
 * @build 24.08.26
 * @updated 24.08.26 PHT
 * @author TONYTONY Sàrl
 * @dependencies GSAP
 */

export function initLanguageSwitcherBtn() {
    const triggers = document.querySelectorAll(".language__trigger");
    if (!triggers.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sizeDuration = reduceMotion ? 0 : 0.55;
    const opacityDuration = reduceMotion ? 0 : 0.15;

    const instances = [];

    triggers.forEach((trigger) => {
        const wrap = siblingWithClass(trigger, "language__wrap");
        if (!wrap) return;

        gsap.set(wrap, { width: 0, opacity: 0, overflow: "hidden" });

        const tl = gsap.timeline({ paused: true });
        tl.to(wrap, { width: "auto", duration: sizeDuration, ease: "expo.out" }, 0)
            .to(wrap, { opacity: 1, duration: opacityDuration, ease: "sine.in" }, 0);

        const instance = { trigger, wrap, tl, isOpen: false };
        instances.push(instance);

        trigger.setAttribute("role", "button");
        trigger.setAttribute("aria-expanded", "false");
        if (!trigger.hasAttribute("tabindex")) trigger.setAttribute("tabindex", "0");

        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            instance.isOpen ? closeInstance(instance) : openInstance(instance, instances);
        });

        trigger.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            trigger.click();
        });
    });

    document.addEventListener("click", (event) => {
        instances.forEach((instance) => {
            if (!instance.isOpen) return;
            if (instance.trigger.contains(event.target) || instance.wrap.contains(event.target)) return;
            closeInstance(instance);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        instances.forEach((instance) => {
            if (instance.isOpen) closeInstance(instance);
        });
    });
}

function siblingWithClass(element, className) {
    const parent = element.parentElement;
    if (!parent) return null;
    return Array.from(parent.children).find(
        (child) => child !== element && child.classList.contains(className)
    );
}

function openInstance(instance, instances) {
    instances.forEach((other) => {
        if (other !== instance && other.isOpen) closeInstance(other);
    });
    instance.isOpen = true;
    instance.tl.play();
    instance.trigger.setAttribute("aria-expanded", "true");
}

function closeInstance(instance) {
    instance.isOpen = false;
    instance.tl.reverse();
    instance.trigger.setAttribute("aria-expanded", "false");
}
