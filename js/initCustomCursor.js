/**
 * TONYTONY | initCustomCursor
 * Custom GSAP-animated cursor with edge-aware positioning, drag state handling, and responsive cleanup.
 * @build 22.03.26
 * @updated 11:04 PHT
 */

export function initCustomCursor(OPTIONS_CURSOR = {
    BREAKPOINT: 768,
    TARGETS: document.querySelectorAll("[data-cursor]"),
    SIZE: "90px",
    RADIUS: "50%",
    FONT_SIZE: "18px",
    COLOR: { BACKGROUND: "var(--accent)", TEXT: "var(--dark)" },
    MIX_BLEND_MODE: "difference",
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

/*
export function initCustomCursor({
  BREAKPOINT = 768,
  SIZE = "90px",
  RADIUS = "50%",
  FONT_SIZE = "18px",
  COLOR = { BACKGROUND: "var(--accent)", TEXT: "var(--dark)" },
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
*/
