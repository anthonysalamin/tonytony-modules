/**
 * TONYTONY | initGetcited
 * Wires the Get Cited modal: clear/cancel, mailto submit with domain,
 * and horizontal badge strip drag-scroll with edge fades.
 * Copy follows the URL locale (/fr/, /de/, default en).
 *
 * @build 14.08.26
 * @updated 14.08.26 PHT
 * @author TONYTONY Sàrl
 */

const COPY = {
    en: {
        needDomain: "Oops, I need your domain first 🤓",
        invalidDomain: "Incorrect domain 🧐",
        cancel: "Are you sure ? 🫪",
        emailSubject: "Contact SEO/AEO/SEA",
        emailBody: (domain) =>
            `Hello,\n\nI would like to import authority signals for the following domain:\n${domain}\n\nThank you.`,
    },
    fr: {
        needDomain: "Oups, domaine requis 🤓",
        invalidDomain: "Domaine incorrect 🧐",
        cancel: "Vous êtes sûr ? 🫪",
        emailSubject: "Contact SEO/AEO/SEA",
        emailBody: (domain) =>
            `Bonjour,\n\nJe souhaite importer des signaux d'autorité pour le domaine suivant :\n${domain}\n\nMerci.`,
    },
    de: {
        needDomain: "Ups, Domain nötig 🤓",
        invalidDomain: "Ungültige Domain 🧐",
        cancel: "Sind Sie sicher? 🫪",
        emailSubject: "Kontakt SEO/AEO/SEA",
        emailBody: (domain) =>
            `Guten Tag,\n\nich möchte Authority-Signale für die folgende Domain importieren:\n${domain}\n\nVielen Dank.`,
    },
};

/** Hostname with at least one dot and a 2+ char TLD (e.g. example.com, sub.example.co.uk). */
const DOMAIN_RE =
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

/**
 * Strips protocol, path, port, trailing slash — leaves a bare hostname.
 *
 * @param {string} raw
 * @returns {string}
 */
function normalizeDomain(raw) {
    let v = raw.trim().toLowerCase();
    v = v.replace(/^https?:\/\//, "");
    v = v.split("/")[0].split("?")[0].split("#")[0];
    v = v.replace(/:\d+$/, "").replace(/\.$/, "");
    return v;
}

/**
 * @param {string} domain
 * @returns {boolean}
 */
function isValidDomain(domain) {
    return DOMAIN_RE.test(domain);
}

/**
 * Detects active locale from the URL path — `/fr/` → fr, `/de/` → de, default en.
 *
 * @returns {'en' | 'fr' | 'de'}
 */
function getLocale() {
    const path = window.location.pathname;
    if (/^\/fr(\/|$)/.test(path)) return "fr";
    if (/^\/de(\/|$)/.test(path)) return "de";
    return "en";
}

export function initGetcited() {
    const root = document.querySelector('[data-tt-cite="root"]');
    if (!root) return;

    const t = COPY[getLocale()] || COPY.en;
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
            if (input) input.placeholder = t.cancel;
        });
    }

    const submitEl = root.querySelector('[data-tt-cite="submit"]');
    if (submitEl) {
        submitEl.addEventListener("click", () => {
            const raw = input ? input.value.trim() : "";

            if (!raw) {
                if (input) input.placeholder = t.needDomain;
                return;
            }

            const domain = normalizeDomain(raw);
            if (!isValidDomain(domain)) {
                clear();
                if (input) input.placeholder = t.invalidDomain;
                return;
            }

            const emailTo = "hey+getcited@tonytony.ch";
            const emailSubject = encodeURIComponent(t.emailSubject);
            const emailBody = encodeURIComponent(t.emailBody(domain));

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
