/**
 * TONYTONY | initCustomCursor
 * Builds a GSAP-driven custom cursor for `[data-cursor]` targets with edge-aware offsets and responsive teardown.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initCustomCursor(OPTIONS_CURSOR = {
    BREAKPOINT: 768,
    TARGETS: document.querySelectorAll("[data-cursor]"),
    SIZE: "90px",
    RADIUS: "50%",
    FONT_SIZE: "18px",
    COLOR: { BACKGROUND: "var(--accent)", TEXT: "var(--primary)" },
    MIX_BLEND_MODE: "normal",
    OFFSET: 10,
    EDGE_MARGIN: 100,
}) {
    if (!checkTargets(OPTIONS_CURSOR)) return;

    const cursorInstance = { current: null };
    cursorInstance.current = _initCursor(OPTIONS_CURSOR);
    handleResize(cursorInstance, OPTIONS_CURSOR);
    checkInitialHover(OPTIONS_CURSOR, cursorInstance.current);
}

function checkTargets(e) {
    return !!e.TARGETS.length || (console.log("Skipping custom cursor - No targets found."), !1);
}

function handleResize(e, t) {
    window.addEventListener(
        "resize",
        debounce(() => {
            window.innerWidth <= t.BREAKPOINT
                ? e.current && (cleanupCursor(e.current), (e.current = null))
                : e.current || (e.current = _initCursor(t));
        }, 200)
    );
}

function debounce(e, t) {
    let n;
    return function (...r) {
        clearTimeout(n);
        n = setTimeout(() => e.apply(this, r), t);
    };
}

function cleanupCursor(e) {
    if (!e) return;
    let { cursor: t, eventListeners: n } = e;
    if (n) {
        document.removeEventListener("mousemove", n.mouseMoveHandler);
        document.removeEventListener("mousedown", n.mouseDownHandler);
        document.removeEventListener("mouseup", n.mouseUpHandler);
    }
    t?.parentNode && t.parentNode.removeChild(t);
}

function getCursorOffset(clientX, clientY, opts) {
    const size = parseInt(opts.SIZE);
    const offset = opts.OFFSET;
    const margin = opts.EDGE_MARGIN;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spaceRight = vw - clientX;
    const spaceBottom = vh - clientY;

    let offsetX = offset;
    let offsetY = offset;

    if (spaceRight < size + margin) {
        const t = Math.min(1, Math.max(0, 1 - (spaceRight - size) / margin));
        offsetX = offset * (1 - t) + (-size - offset) * t;
    }

    if (spaceBottom < size + margin) {
        const t = Math.min(1, Math.max(0, 1 - (spaceBottom - size) / margin));
        offsetY = offset * (1 - t) + (-size - offset) * t;
    }

    return { offsetX, offsetY };
}

function _initCursor(e) {
    if (window.innerWidth <= e.BREAKPOINT) return console.log("Skipping custom cursor on mobile."), null;

    let t = document.createElement("div");
    Object.assign(t.style, {
        width: e.SIZE,
        height: e.SIZE,
        borderRadius: e.RADIUS,
        mixBlendMode: e.MIX_BLEND_MODE,
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: e.COLOR.BACKGROUND,
        color: e.COLOR.TEXT,
        pointerEvents: "none",
        zIndex: "9999",
        opacity: "0",
        left: "-9999px",
        top: "-9999px",
    });
    document.body.appendChild(t);

    let currentTarget = null;

    const mouseMoveHandler = (ev) => {
        const { offsetX, offsetY } = getCursorOffset(ev.clientX, ev.clientY, e);
        gsap.to(t, {
            duration: 0.65,
            left: ev.clientX + offsetX,
            top: ev.clientY + offsetY,
            ease: "power2.out",
        });

        const target = ev.target.closest("[data-cursor]");

        if (target && target !== currentTarget) {
            currentTarget = target;
            const cursorText = target.dataset.cursor;
            const isDrag = cursorText.toLowerCase() === "drag";

            t.innerHTML = `<span style="margin: 0; padding: 0; font-size: ${e.FONT_SIZE}; font-weight: 500; letter-spacing: 0.2px; text-align: center; line-height: 1;"><b>${cursorText}</b></span>`;
            gsap.to(t, { opacity: 1, duration: 0.3, ease: "power2.out" });

            if (isDrag) target.style.cursor = "grab";

        } else if (!target && currentTarget) {
            if (currentTarget.dataset.cursor.toLowerCase() === "drag") {
                currentTarget.style.cursor = "";
            }
            currentTarget = null;
            gsap.to(t, { opacity: 0, duration: 0.3, ease: "power2.out" });
        }
    };

    const mouseDownHandler = () => {
        if (currentTarget && currentTarget.dataset.cursor.toLowerCase() === "drag") {
            currentTarget.style.cursor = "grabbing";
        }
    };

    const mouseUpHandler = () => {
        if (currentTarget && currentTarget.dataset.cursor.toLowerCase() === "drag") {
            currentTarget.style.cursor = "grab";
        }
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    return {
        cursor: t,
        eventListeners: { mouseMoveHandler, mouseDownHandler, mouseUpHandler },
        targets: e.TARGETS
    };
}

function checkInitialHover(e, t) {
    t &&
        e.TARGETS.forEach((n) => {
            let r = n.getBoundingClientRect(),
                o = window.innerWidth / 2,
                i = window.innerHeight / 2;
            o >= r.left &&
                o <= r.right &&
                i >= r.top &&
                i <= r.bottom &&
                ((t.cursor.innerHTML = `<span style="margin: 0; padding: 0; font-size: ${e.FONT_SIZE}; font-weight: 500; letter-spacing: 0.2px; text-align: center; line-height: 1;"><b>${n.dataset.cursor}</b></span>`),
                    gsap.to(t.cursor, { opacity: 1, duration: 0.3, ease: "power2.out" }));
        });
}
