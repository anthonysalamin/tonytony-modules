/**
 * TONYTONY | initStart
 * Wires the Start today modal: domain validation, mailto submit,
 * and three always-on toggles that refuse to stay off.
 * Copy follows the URL locale (/fr/, /de/, default en).
 *
 * @build 18.08.26
 * @updated 18.08.26 PHT
 * @author TONYTONY Sàrl
 * @dependencies GSAP
 */

const COPY = {
    en: {
        needDomain: "Oops, domain is needed.",
        invalidDomain: "Incorrect domain, try again.",
        cancel: "Boooooooooring.",
        emailSubject: "Project Inquiry",
        emailBody: (domain) =>
            `Hello Anthony,\n\nI would like to discuss a project for the following domain: ${domain}\n\nI'd like a free quote, an answer within 24h, with no obligation.\n\nHave a great day !`,
    },
    fr: {
        needDomain: "Oups, domaine requis.",
        invalidDomain: "Domaine incorrect.",
        cancel: "Non n'est pas une option.",
        emailSubject: "Demande de projet",
        emailBody: (domain) =>
            `Bonjour Anthony,\n\nJe souhaite discuter d'un projet pour le domaine suivant : ${domain}\n\nJe voudrais un devis gratuit, une réponse sous 24h, sans engagement.\n\nPassez une excellente journée !`,
    },
    de: {
        needDomain: "Ups, Domain nötig.",
        invalidDomain: "Ungültige Domain.",
        cancel: "Ein 'Nein' akzeptiere ich nicht.",
        emailSubject: "Projektanfrage",
        emailBody: (domain) =>
            `Hallo Anthony,\n\nich möchte ein Projekt für die folgende Domain besprechen: ${domain}\n\nIch hätte gerne ein kostenloses Angebot, eine Antwort innerhalb von 24h, ohne Verpflichtung.\n\nEinen schönen Tag noch!`,
    },
};

/** Hostname with at least one dot and a 2+ char TLD (e.g. example.com, sub.example.co.uk). */
const DOMAIN_RE = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

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
 * Lets the toggle sit off briefly, shakes it, then forces it back on.
 *
 * @param {HTMLInputElement} toggle
 * @param {Set<HTMLInputElement>} shaking
 */
function shakeAndRestore(toggle, shaking) {
    const switchEl = toggle.closest(".tt-toggle-switch") ?? toggle;

    const restore = () => {
        toggle.checked = true;
        shaking.delete(toggle);
        if (typeof gsap !== "undefined") gsap.set(switchEl, { rotation: 0, x: 0 });
    };

    if (typeof gsap === "undefined") {
        restore();
        return;
    }

    gsap.killTweensOf(switchEl);
    gsap.set(switchEl, { transformOrigin: "50% 50%", rotation: 0, x: 0 });

    gsap.timeline({ onComplete: restore })
        .to(switchEl, { rotation: -14, x: -5, duration: 0.08, ease: "power2.out", delay: 0.15 })
        .to(switchEl, { rotation: 18, x: 6, duration: 0.09, ease: "none" })
        .to(switchEl, { rotation: -12, x: -4, duration: 0.08, ease: "none" })
        .to(switchEl, { rotation: 8, x: 3, duration: 0.08, ease: "none" })
        .to(switchEl, { rotation: 0, x: 0, duration: 0.12, ease: "power2.out" });
}

export function initStart() {
    const root = document.querySelector('[data-start="root"]');
    if (!root) return;

    const t = COPY[getLocale()] || COPY.en;

    const input = root.querySelector('[data-start="domain"]');
    const defaultPlaceholder = input?.placeholder ?? "";
    const closeEl = root.querySelector('[data-start="close"]');
    const cancelEl = root.querySelector('[data-start="cancel"]');
    const submitEl = root.querySelector('[data-start="submit"]');

    const toggles = [...root.querySelectorAll('.tt-cite-toggles input[type="checkbox"]')];
    const shaking = new Set();

    toggles.forEach((toggle) => {
        toggle.checked = true;

        toggle.addEventListener("click", (e) => {
            if (!shaking.has(toggle)) return;
            e.preventDefault();
            toggle.checked = true;
        });

        toggle.addEventListener("change", () => {
            if (toggle.checked) return;
            if (shaking.has(toggle)) {
                toggle.checked = true;
                return;
            }
            shaking.add(toggle);
            shakeAndRestore(toggle, shaking);
        });
    });

    const clear = () => {
        if (!input) return;
        input.value = "";
        resetInputState(input);
        input.placeholder = defaultPlaceholder;
    };

    if (input) {
        input.addEventListener("focus", () => {
            resetInputState(input);
            input.placeholder = defaultPlaceholder;
        });
    }

    if (closeEl) closeEl.addEventListener("click", clear);

    if (cancelEl) {
        cancelEl.addEventListener("click", () => {
            clear();
            if (input) input.placeholder = t.cancel;
        });
    }

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

            const emailTo = "hey+start@tonytony.ch";
            const emailSubject = encodeURIComponent(t.emailSubject);
            const emailBody = encodeURIComponent(t.emailBody(domain));

            window.open(
                `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`,
                "_blank",
                "noopener,noreferrer",
            );
        });
    }
}
