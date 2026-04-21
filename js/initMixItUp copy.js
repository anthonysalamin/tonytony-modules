/**
 * TONYTONY | initMixItUp
 * Prepares portfolio DOM classes from CMS fields, boots MixItUp with callbacks, and wires live search plus status.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

// ── Selectors ──────────────────────────────────────────────────────────────────

const SEL = {
    controls: '[data-mixitup="controls"]',
    container: '[data-mixitup="container"]',
    search: '[data-mixitup="search"]',
    status: '[data-mixitup="status"]',
    item: '.mixitup__collection-item',
    category: '.mixitup__category',
    title: '.mixitup__title',
    featuring: '.mixitup__featuring',
    filter: '.filter',
};

// ── Localization ───────────────────────────────────────────────────────────────

const LOCALIZATION = {
    fr: {
        title: "Une sélection de mes derniers travaux",
        errors: "Aucun élément ne correspond à votre recherche.",
        search: "Recherche en cours...",
    },
    de: {
        title: "Eine Auswahl meiner letzten Arbeiten",
        errors: "Keine Übereinstimmung gefunden",
        search: "Suche läuft...",
    },
    en: {
        title: "A selection of my latest works",
        errors: "No matching item to display.",
        search: "Searching...",
    },
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * TONYTONY | toClassName
 * Normalizes arbitrary labels into lowercase alphanumeric class tokens by stripping diacritics and symbols.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
function toClassName(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // strip combining diacritical marks
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase();
}

/**
 * TONYTONY | refreshScrollTrigger
 * Schedules a ScrollTrigger refresh on the next frame whenever GSAP's plugin is available.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
function refreshScrollTrigger() {
    requestAnimationFrame(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
}

// ── DOM transforms ─────────────────────────────────────────────────────────────

/**
 * TONYTONY | setDataAttributes
 * Copies each empty `data-filter` button's text into a normalized `.class` selector MixItUp can consume.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
function setDataAttributes(controls) {
    if (!controls) return;

    controls.querySelectorAll('[data-filter=""]').forEach((btn) => {
        btn.setAttribute('data-filter', `.${toClassName(btn.textContent)}`);
    });
}

/**
 * TONYTONY | bindFilterChecked
 * Ensures portfolio filter buttons behave like radio chips by moving `.checked` to the latest click target.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
function bindFilterChecked(controls) {
    if (!controls) return;

    controls.querySelectorAll(SEL.filter).forEach((btn) => {
        btn.addEventListener('click', ({ currentTarget }) => {
            if (currentTarget.classList.contains('checked')) return;

            controls.querySelector(`${SEL.filter}.checked`)?.classList.remove('checked');
            currentTarget.classList.add('checked');
        });
    });
}

/**
 * TONYTONY | applyItemClasses
 * Adds derived filter classes to every `.mixitup__collection-item` from featuring flags, categories, and titles.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
function applyItemClasses() {
    document.querySelectorAll(SEL.item).forEach((item) => {
        // Featuring
        const feat = item.querySelector(SEL.featuring);
        if (feat && !feat.classList.contains('w-condition-invisible')) {
            item.classList.add(toClassName(feat.textContent));
        }

        // Categories (multi-ref — can have several)
        item.querySelectorAll(SEL.category).forEach((cat) => {
            item.classList.add(toClassName(cat.textContent));
        });

        // Title
        const title = item.querySelector(SEL.title);
        if (title) {
            item.classList.add(toClassName(title.textContent));
        }
    });
}

// ── MixItUp core ───────────────────────────────────────────────────────────────

/**
 * TONYTONY | updateStatus
 * Prints a human-readable total of visible MixItUp targets into the optional status node.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
function updateStatus(statusEl, mixer) {
    if (!statusEl) return;

    const count = mixer.getState().totalShow;
    statusEl.textContent = `${count} result${count !== 1 ? 's' : ''}`;
}

/**
 * TONYTONY | filterBySearch
 * Applies substring class filters when searching or re-selects featuring/all states when the query clears.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
function filterBySearch(mixer, controls, searchValue) {
    if (searchValue) {
        mixer.filter(`[class*="${searchValue}"]`);
        return;
    }

    // Reset: re-activate the "featuring" button or show all
    controls?.querySelector(`${SEL.filter}.checked`)?.classList.remove('checked');

    const featBtn = controls?.querySelector('[data-filter*="featuring"]');
    if (featBtn) {
        featBtn.classList.add('checked');
        mixer.filter('.featuring');
    } else {
        mixer.filter('*');
    }
}

/**
 * TONYTONY | bindSearch
 * Debounces portfolio search input keyups and clears filters instantly when Escape is pressed.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
function bindSearch(inputEl, mixer, controls) {
    if (!inputEl) return;

    let timeout;

    inputEl.addEventListener('keyup', () => {
        const value = inputEl.value.trim().toLowerCase() || '';
        clearTimeout(timeout);
        timeout = setTimeout(() => filterBySearch(mixer, controls, value), 350);
    });

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            inputEl.value = '';
            filterBySearch(mixer, controls, '');
        }
    });
}

// ── Public entry point ─────────────────────────────────────────────────────────

export function initMixItUp(production = false) {
    const container = document.querySelector(SEL.container);
    if (!container) return;

    const controls = document.querySelector(SEL.controls);
    const inputSearch = document.querySelector(SEL.search);
    const statusEl = document.querySelector(SEL.status);

    // 1. Transform DOM
    setDataAttributes(controls);
    bindFilterChecked(controls);
    applyItemClasses();

    // 2. Initial status
    if (!production && statusEl) {
        statusEl.textContent = 'Case studies';
    }

    // 3. Init MixItUp
    const mixer = mixitup(container, {
        load: {
            filter: '.featuring',
        },
        selectors: {
            target: SEL.item,
        },
        animation: {
            duration: 450,
            nudge: true,
            reverseOut: true,
            effects: 'fade scale(0.77) translateZ(-68px) stagger(6ms)',
        },
        callbacks: {
            onMixStart: () => {
                if (statusEl) statusEl.textContent = 'Searching...';
            },
            onMixEnd: () => {
                updateStatus(statusEl, mixer);
                refreshScrollTrigger();
            },
            onMixFail: () => {
                if (statusEl) statusEl.textContent = 'No matching item to display.';
                setTimeout(() => {
                    mixer.filter('*');
                    refreshScrollTrigger();
                }, 1000);
            },
        },
    });

    // 4. Search
    bindSearch(inputSearch, mixer, controls);

    // 5. Initial ScrollTrigger sync
    refreshScrollTrigger();

    return mixer;
}