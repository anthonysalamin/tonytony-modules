/**
 * TONYTONY | initGetcited
 * Wires the Get Cited modal: clear/cancel, mailto submit with domain,
 * and a two-row auto ticker (pixel-measured seamless loop).
 * Copy follows the URL locale (/fr/, /de/, default en).
 *
 * @build 15.08.26
 * @updated 15.08.26 PHT
 * @author TONYTONY Sàrl
 */

const COPY = {
    en: {
        needDomain: "Oops, domain is needed.",
        invalidDomain: "Incorrect domain, try again.",
        cancel: "Boooooooooring.",
        emailSubject: "Contact SEO/AEO/SEA",
        emailBody: (domain) =>
            `Hello,\n\nI would like to discuss authority signals for the following domain: ${domain}\n\nHave a great day !`,
    },
    fr: {
        needDomain: "Oups, domaine requis.",
        invalidDomain: "Domaine incorrect.",
        cancel: "Non n'est pas une option.",
        emailSubject: "Contact SEO/AEO/SEA",
        emailBody: (domain) =>
            `Bonjour,\n\nJe souhaiterais discuter des signaux d'autorité pour le domaine suivant : ${domain}\n\nBonne journée !`,
    },
    de: {
        needDomain: "Ups, Domain nötig.",
        invalidDomain: "Ungültige Domain.",
        cancel: "Ein 'Nein' akzeptiere ich nicht.",
        emailSubject: "Kontakt SEO/AEO/SEA",
        emailBody: (domain) =>
            `Guten Tag,\n\nich möchte Authority-Signale für die folgende Domain besprechen: ${domain}\n\nEinen schönen Tag !`,
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

/**
 * Sets --tt-cite-shift on each ticker row from the first set's measured width.
 *
 * @param {Element} root
 */
function initTickerMeasure(root) {
    const measure = () => {
        root.querySelectorAll('[data-tt-cite="row"]').forEach((row) => {
            const set = row.querySelector('[data-tt-cite="set"]');
            if (!set) return;
            row.style.setProperty("--tt-cite-shift", `${set.offsetWidth}px`);
        });
    };

    measure();

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(measure, 150);
    });
}

export function initGetcited() {
    const root = document.querySelector('[data-getcited="root"]');
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

            window.open(
                `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`,
                "_blank",
                "noopener,noreferrer",
            );
        });
    }

    initTickerMeasure(root);
}
