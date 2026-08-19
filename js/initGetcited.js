/**
 * TONYTONY | initGetcited
 * Wires the Get Cited modal: clear/cancel, mailto submit with domain,
 * and a two-row auto ticker (pixel-measured seamless loop).
 * Copy follows the URL locale (/fr/, /de/, default en).
 *
 * @build 15.08.26
 * @updated 19.08.26 PHT
 * @author TONYTONY Sàrl
 * @dependencies GSAP
 */

const COPY = {
    en: {
        needDomain: "Oops, domain is needed.",
        invalidDomain: "Incorrect domain, try again.",
        cancel: "Boooooooooring.",
        emailSubject: "Contact SEO/AEO/SEA",
        emailBody: (domain) =>
            `Hello Anthony,\n\nI would like to discuss authority signals for the following domain: ${domain}\n\nHave a great day !`,
    },
    fr: {
        needDomain: "Oups, domaine requis.",
        invalidDomain: "Domaine incorrect.",
        cancel: "Boooooooooring.",
        emailSubject: "Contact SEO/AEO/SEA",
        emailBody: (domain) =>
            `Bonjour Anthony,\n\nJe souhaiterais discuter des signaux d'autorité pour le domaine suivant : ${domain}\n\nBonne journée !`,
    },
    de: {
        needDomain: "Ups, Domain nötig.",
        invalidDomain: "Ungültige Domain.",
        cancel: "Boooooooooring.",
        emailSubject: "Kontakt SEO/AEO/SEA",
        emailBody: (domain) =>
            `Hallo Anthony,\n\nich möchte Authority-Signale für die folgende Domain besprechen: ${domain}\n\nEinen schönen Tag !`,
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

const INPUT_STATES = ["is-warn", "is-error"];

/**
 * @param {HTMLInputElement | null} input
 */
function resetInputState(input) {
    if (!input) return;
    INPUT_STATES.forEach((state) => input.classList.remove(state));
}

/**
 * @param {HTMLInputElement | null} input
 * @param {string} message
 */
function setInputWarn(input, message) {
    if (!input) return;
    resetInputState(input);
    input.classList.add("is-warn");
    input.placeholder = message;
}

/**
 * @param {HTMLInputElement | null} input
 * @param {string} message
 */
function setInputError(input, message) {
    if (!input) return;
    resetInputState(input);
    input.classList.add("is-error");
    input.placeholder = message;
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
    const defaultPlaceholder = input?.placeholder ?? "";
    let typeTween;

    const killTypeTween = () => {
        if (!typeTween) return;
        typeTween.kill();
        typeTween = null;
    };

    const typeCancelPlaceholder = () => {
        if (!input) return;
        killTypeTween();
        const text = t.cancel;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (typeof gsap === "undefined" || reduceMotion) {
            input.placeholder = text;
            return;
        }

        input.placeholder = "";
        const proxy = { n: 0 };
        typeTween = gsap.to(proxy, {
            n: text.length,
            duration: 0.75,
            ease: "none",
            onUpdate() {
                input.placeholder = text.slice(0, Math.round(proxy.n));
            },
            onComplete() {
                input.placeholder = text;
                typeTween = null;
            },
        });
    };

    const clear = () => {
        killTypeTween();
        if (!input) return;
        input.value = "";
        resetInputState(input);
        input.placeholder = defaultPlaceholder;
    };

    if (input) {
        input.addEventListener("focus", () => {
            killTypeTween();
            resetInputState(input);
            input.placeholder = defaultPlaceholder;
        });
    }

    const closeEl = root.querySelector('[data-tt-cite="close"]');
    if (closeEl) closeEl.addEventListener("click", clear);

    const cancelEl = root.querySelector('[data-tt-cite="cancel"]');
    if (cancelEl) {
        cancelEl.addEventListener("click", () => {
            clear();
            typeCancelPlaceholder();
        });
    }

    const submitEl = root.querySelector('[data-tt-cite="submit"]');
    if (submitEl) {
        submitEl.addEventListener("click", () => {
            const raw = input ? input.value.trim() : "";

            if (!raw) {
                setInputWarn(input, t.needDomain);
                return;
            }

            const domain = normalizeDomain(raw);
            if (!isValidDomain(domain)) {
                clear();
                setInputError(input, t.invalidDomain);
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
