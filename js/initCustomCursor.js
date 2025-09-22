/**
 * UTILITY | initCustomCursor
 * @build 09.02.25 @updated 18:29 PHT
 */

export function initCustomCursor({
    BREAKPOINT = 768,
    SIZE = "90px",
    RADIUS = "50%",
    FONT_SIZE = "18px",
    COLOR = { BACKGROUND: "var(--accent)", TEXT: "var(--White)" },
    MIX_BLEND_MODE = "normal",
    TARGETS = document.querySelectorAll("[data-cursor]")
} = {}) {
    if (!checkTargets(TARGETS)) return;

    const cursorInstance = { current: null };
    cursorInstance.current = createCursor(TARGETS, { SIZE, RADIUS, FONT_SIZE, COLOR, MIX_BLEND_MODE, BREAKPOINT });

    handleResize(cursorInstance, { SIZE, RADIUS, FONT_SIZE, COLOR, MIX_BLEND_MODE, BREAKPOINT, TARGETS });
    checkInitialHover(TARGETS, cursorInstance.current, FONT_SIZE);
}

// -------------------------
// Internal functions
// -------------------------

function checkTargets(targets) {
    if (!targets.length) {
        console.log("Skipping custom cursor - No targets found.");
        return false;
    }
    return true;
}

function handleResize(instance, options) {
    window.addEventListener(
        "resize",
        debounce(() => {
            if (window.innerWidth <= options.BREAKPOINT) {
                if (instance.current) {
                    cleanupCursor(instance.current);
                    instance.current = null;
                }
            } else if (!instance.current) {
                instance.current = createCursor(options.TARGETS, options);
            }
        }, 200)
    );
}

function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

function cleanupCursor(instance) {
    if (!instance) return;

    const { cursor, eventListeners, targets } = instance;

    targets.forEach((target, i) => {
        const listeners = eventListeners[i];
        target.removeEventListener("mousemove", listeners.mousemove);
        target.removeEventListener("mouseenter", listeners.mouseenter);
        target.removeEventListener("mouseleave", listeners.mouseleave);
    });

    if (cursor?.parentNode) cursor.parentNode.removeChild(cursor);
}

function createCursor(targets, options) {
    if (window.innerWidth <= options.BREAKPOINT) {
        console.log("Skipping custom cursor on mobile.");
        return null;
    }

    const cursor = document.createElement("div");
    Object.assign(cursor.style, {
        width: options.SIZE,
        height: options.SIZE,
        borderRadius: options.RADIUS,
        mixBlendMode: options.MIX_BLEND_MODE,
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: options.COLOR.BACKGROUND,
        color: options.COLOR.TEXT,
        pointerEvents: "none",
        zIndex: "9999",
        opacity: "0",
        left: "-9999px",
        top: "-9999px"
    });
    document.body.appendChild(cursor);

    const eventListeners = [];

    targets.forEach(target => {
        const listeners = {
            mousemove(e) {
                const x = e.clientX + 10;
                const y = e.clientY + 10;
                gsap.to(cursor, { duration: 0.65, left: x, top: y, ease: "power2.out" });
            },
            mouseenter() {
                cursor.innerHTML = `<p style="margin:0;padding:0;font-size:${options.FONT_SIZE};font-weight:500;letter-spacing:0.2px;text-align:center;line-height:1;"><b>${target.dataset.cursor}</b></p>`;
                gsap.to(cursor, { opacity: 1, duration: 0.3, ease: "power2.out" });
            },
            mouseleave(event) {
                const related = event.relatedTarget;
                let newText = null;
                targets.forEach(t => { if (t.contains(related)) newText = t.dataset.cursor; });
                if (newText) {
                    cursor.innerHTML = `<p style="margin:0;padding:0;font-size:${options.FONT_SIZE};font-weight:500;letter-spacing:0.2px;text-align:center;line-height:1;"><b>${newText}</b></p>`;
                } else {
                    gsap.to(cursor, { opacity: 0, duration: 0.3, ease: "power2.out" });
                }
            }
        };

        target.addEventListener("mousemove", listeners.mousemove);
        target.addEventListener("mouseenter", listeners.mouseenter);
        target.addEventListener("mouseleave", listeners.mouseleave);

        eventListeners.push(listeners);
    });

    return { cursor, eventListeners, targets };
}

function checkInitialHover(targets, instance, FONT_SIZE) {
    if (!instance) return;

    targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        if (centerX >= rect.left && centerX <= rect.right && centerY >= rect.top && centerY <= rect.bottom) {
            instance.cursor.innerHTML = `<p style="margin:0;padding:0;font-size:${FONT_SIZE};font-weight:500;letter-spacing:0.2px;text-align:center;line-height:1;"><b>${target.dataset.cursor}</b></p>`;
            gsap.to(instance.cursor, { opacity: 1, duration: 0.3, ease: "power2.out" });
        }
    });
}