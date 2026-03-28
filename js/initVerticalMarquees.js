/**
 * UTILITY | initVerticalMarquees
 * Continuously scrolls vertical marquee columns up or down, creating an infinite looping animation.
 * @build 17.03.25
 * @updated 28.03.26 — 17:50 PHT
 */

export function initVerticalMarquees() {
    const OPTIONS = {
        MARKEES_CONTAINER: `[data-markees="container"]`,
        COLUMN_FORWARD: `[data-markees="column-forward"]`,
        COLUMN_BACKWARD: `[data-markees="column-backward"]`,
        CLONE_ATTR: "data-markees-clone",
        DURATION: 16,
    };

    let cachedWidth = window.innerWidth;

    // 🥭 init
    setupColumns(OPTIONS);

    // 🥭 resize — only when width actually changes
    window.addEventListener(
        "resize",
        debounce(() => {
            if (window.innerWidth === cachedWidth) return;
            cachedWidth = window.innerWidth;
            gsap.killTweensOf(
                `${OPTIONS.COLUMN_FORWARD}, ${OPTIONS.COLUMN_BACKWARD}`
            );
            setupColumns(OPTIONS);
        }, 250)
    );

    // ——————————————————————————————————————
    // Setup
    // ——————————————————————————————————————

    function setupColumns(options) {
        document
            .querySelectorAll(
                `${options.COLUMN_FORWARD}, ${options.COLUMN_BACKWARD}`
            )
            .forEach((column) => {
                // Clean up previous clones (resize safety)
                column
                    .querySelectorAll(`[${options.CLONE_ATTR}]`)
                    .forEach((el) => el.remove());

                const container = column.querySelector(
                    options.MARKEES_CONTAINER
                );
                if (!container) return;

                const clone = container.cloneNode(true);
                clone.setAttribute(options.CLONE_ATTR, "");

                const isBackward = column.matches(options.COLUMN_BACKWARD);

                if (isBackward) {
                    column.prepend(clone);
                } else {
                    column.appendChild(clone);
                }

                const height = container.offsetHeight;
                const duration =
                    options.DURATION * (0.8 + 2 * Math.random());

                gsap.set(column, {
                    y: isBackward ? -height : 0,
                    force3D: true,
                    willChange: "transform",
                });

                gsap.to(column, {
                    y: isBackward ? 0 : -height,
                    duration,
                    repeat: -1,
                    ease: "none",
                });
            });
    }

    // ——————————————————————————————————————
    // Helpers
    // ——————————————————————————————————————

    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
}