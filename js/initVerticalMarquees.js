/**
 * UTILITY | initVerticalMarquees
 * It continuously scrolls vertical marquee columns up or down, creating an infinite looping animation.
 * @build 17.03.25
 * @updated 17:22 CEST
 */

export function initVerticalMarquees() {
    const OPTIONS = {
        MARKEES_CONTAINER: `[data-markees="container"]`,
        COLUMN_FORWARD: `[data-markees="column-forward"]`,
        COLUMN_BACKWARD: `[data-markees="column-backward"]`,
        DURATION: 16
    };

    // 🥭 on load
    initVerticalMarquees(OPTIONS);

    // 🥭 on resize
    window.addEventListener(
        "resize",
        debounce(() => {
            console.log("resized");
            gsap.killTweensOf("[data-markees]");
            initVerticalMarquees(OPTIONS);
        }, 200)
    );

    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function initVerticalMarquees(options) {
        document.querySelectorAll(`${options.COLUMN_FORWARD}, ${options.COLUMN_BACKWARD}`)
            .forEach(column => {
                const container = column.querySelector(options.MARKEES_CONTAINER);
                if (!container) return;

                const clone = container.cloneNode(true);
                column.innerHTML = "";

                const isBackward = column.matches(options.COLUMN_BACKWARD);
                if (isBackward) {
                    column.prepend(clone);
                    column.prepend(container);
                } else {
                    column.appendChild(container);
                    column.appendChild(clone);
                }

                const height = container.offsetHeight;
                const duration = options.DURATION * (0.8 + 2 * Math.random());

                gsap.set(column, { y: isBackward ? -height : 0 });
                gsap.to(column, { y: isBackward ? 0 : -height, duration, repeat: -1, ease: "none" });
            });
    }
}