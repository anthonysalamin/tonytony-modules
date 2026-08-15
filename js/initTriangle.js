/**
 * TONYTONY | initTriangle
 * Wires the Triangle constraint modal: Fast, Good, Cheap (Pick Two).
 * Handles clear/cancel, domain validation, and mailto submit.
 * Copy follows the URL locale (/fr/, /de/, default en).
 *
 * @author TONYTONY Sàrl
 */

const COPY = {
    en: {
        needDomain: "Oops, domain is needed.",
        invalidDomain: "Incorrect domain, try again.",
        cancel: "No is not an answer.",
        emailSubject: "Project Inquiry",
        emailBody: (domain, choices) =>
            `Hello,\n\nI would like to discuss a project for the following domain:\n${domain}\n\nMy priorities are: ${choices.join(" and ")}.\n\nThank you.`,
    },
    fr: {
        needDomain: "Oups, domaine requis.",
        invalidDomain: "Domaine incorrect.",
        cancel: "Non n'est pas une option.",
        emailSubject: "Demande de projet",
        emailBody: (domain, choices) =>
            `Bonjour,\n\nJe souhaite discuter d'un projet pour le domaine suivant :\n${domain}\n\nMes priorités sont : ${choices.join(" et ")}.\n\nMerci.`,
    },
    de: {
        needDomain: "Ups, Domain nötig.",
        invalidDomain: "Ungültige Domain.",
        cancel: "Ein 'Nein' akzeptiere ich nicht.",
        emailSubject: "Projektanfrage",
        emailBody: (domain, choices) =>
            `Guten Tag,\n\nich möchte ein Projekt für die folgende Domain besprechen:\n${domain}\n\nMeine Prioritäten sind: ${choices.join(" und ")}.\n\nVielen Dank.`,
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

export function initTriangle() {
    // We scope the query to the wrapper to prevent page-wide conflicts
    const root = document.querySelector('[data-triangle="root"]');
    if (!root) return;

    const t = COPY[getLocale()] || COPY.en;
    
    // UI Elements
    const input = root.querySelector('[data-triangle="domain"]');
    const closeEl = root.querySelector('[data-triangle="close"]');
    const cancelEl = root.querySelector('[data-triangle="cancel"]');
    const submitEl = root.querySelector('[data-triangle="submit"]');

    // Toggles
    const fastEl = root.querySelector('[data-triangle="fast"]');
    const cheapEl = root.querySelector('[data-triangle="cheap"]');
    const goodEl = root.querySelector('[data-triangle="good"]');
    const toggles = [fastEl, cheapEl, goodEl].filter(Boolean);

    // --- "Pick Two" Logic ---
    // Maintain a history array of currently checked items
    let checkedHistory = toggles.filter(toggle => toggle.checked);

    toggles.forEach(toggle => {
        toggle.addEventListener("change", (e) => {
            if (e.target.checked) {
                checkedHistory.push(e.target);
                // If all three are checked, uncheck the oldest one
                if (checkedHistory.length > 2) {
                    const oldestToggle = checkedHistory.shift();
                    oldestToggle.checked = false;
                }
            } else {
                // Remove the unchecked item from history
                checkedHistory = checkedHistory.filter(t => t !== e.target);
            }
        });
    });

    // --- Form Actions ---
    const clear = () => {
        if (input) input.value = "";
    };

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
                if (input) input.placeholder = t.needDomain;
                return;
            }

            const domain = normalizeDomain(raw);
            if (!isValidDomain(domain)) {
                clear();
                if (input) input.placeholder = t.invalidDomain;
                return;
            }

            // Extract the active priorities for the email body
            const activeChoices = checkedHistory.map(toggle => 
                toggle.getAttribute("data-triangle").charAt(0).toUpperCase() + 
                toggle.getAttribute("data-triangle").slice(1)
            );

            const emailTo = "hey+triangle@tonytony.ch";
            const emailSubject = encodeURIComponent(t.emailSubject);
            const emailBody = encodeURIComponent(t.emailBody(domain, activeChoices));

            window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
        });
    }
}