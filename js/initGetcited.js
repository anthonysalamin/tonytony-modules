/**
 * TONYTONY | initGetcited
 * Wires the Get Cited modal: clear/cancel, mailto submit with domain,
 * and horizontal badge strip drag-scroll with edge fades.
 *
 * @build 14.08.26
 * @updated 14.08.26 PHT
 * @author TONYTONY Sàrl
 */

export function initGetcited() {
    const root = document.querySelector('[data-tt-cite="root"]');
    if (!root) return;

    const input = root.querySelector('[data-tt-cite="input"]');
    const clear = () => {
        if (input) input.value = "";
    };

    const closeEl = root.querySelector('[data-tt-cite="close"]');
    if (closeEl) closeEl.addEventListener("click", clear);

    const cancelEl = root.querySelector('[data-tt-cite="cancel"]');
    if (cancelEl) {
        cancelEl.addEventListener("click", () => {
            clear();
            if (input) input.placeholder = "You are missing out... 🫪";
        });
    }

    const submitEl = root.querySelector('[data-tt-cite="submit"]');
    if (submitEl) {
        submitEl.addEventListener("click", () => {
            const value = input ? input.value.trim() : "";

            if (!value) {
                if (input) input.placeholder = "oops, I need your domain";
                return;
            }

            const emailTo = "hey+getcited@tonytony.ch";
            const emailSubject = encodeURIComponent("Contact SEO/AEO/SEA");
            const emailBody = encodeURIComponent(
                `Hello,\n\nI would like to import authority signals for the following domain:\n${value}\n\nThank you.`
            );

            window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
        });
    }

    /* ---- Single-line drag / touch scroll + edge fades ---- */
    const badges = root.querySelector('[data-tt-cite="badges"]');
    const scroll = root.querySelector('[data-tt-cite="scroll"]');
    if (!scroll || !badges) return;

    function updateFades() {
        const max = scroll.scrollWidth - scroll.clientWidth;
        const x = scroll.scrollLeft;
        if (x > 1) badges.setAttribute("data-can-left", "");
        else badges.removeAttribute("data-can-left");
        if (x < max - 1) badges.setAttribute("data-can-right", "");
        else badges.removeAttribute("data-can-right");
    }

    scroll.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    updateFades();

    /* Mouse click-drag to scroll (touch uses native momentum scrolling) */
    let down = false;
    let startX = 0;
    let startLeft = 0;

    scroll.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse") return;
        down = true;
        startX = e.clientX;
        startLeft = scroll.scrollLeft;
        scroll.classList.add("is-dragging");
        try {
            scroll.setPointerCapture(e.pointerId);
        } catch (_) {
            /* ignore capture failures */
        }
    });

    scroll.addEventListener("pointermove", (e) => {
        if (!down) return;
        scroll.scrollLeft = startLeft - (e.clientX - startX);
    });

    function endDrag() {
        if (!down) return;
        down = false;
        scroll.classList.remove("is-dragging");
    }

    scroll.addEventListener("pointerup", endDrag);
    scroll.addEventListener("pointercancel", endDrag);
    scroll.addEventListener("pointerleave", endDrag);
}
