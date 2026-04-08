/**
 * PORTFOLIO | initMixItUp
 * 
 * Sets up portfolio filtering with MixItUp by converting Webflow content to CSS classes.
 * 
 * @build 08.04.26
 * @updated 20:11 PHT
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

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Normalize a string into a valid CSS class name.
 * Strips diacritics via Unicode normalization, removes non-alphanumeric chars.
 */
function toClassName(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // strip combining diacritical marks
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase();
}

/**
 * Refresh ScrollTrigger after layout changes.
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
 * Set data-filter attributes on control buttons from their text content.
 */
function setDataAttributes(controls) {
    if (!controls) return;

    controls.querySelectorAll('[data-filter=""]').forEach((btn) => {
        btn.setAttribute('data-filter', `.${toClassName(btn.textContent)}`);
    });
}

/**
 * Bind click handler that toggles the `.checked` class across filter buttons.
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
 * Convert Webflow CMS fields into CSS classes on each portfolio item.
 * Handles featuring state, categories, and title in a single pass.
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
 * Update the status element with the current result count.
 */
function updateStatus(statusEl, mixer) {
    if (!statusEl) return;

    const count = mixer.getState().totalShow;
    statusEl.textContent = `${count} result${count !== 1 ? 's' : ''}`;
}

/**
 * Filter items by search string or fall back to the active filter button.
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
 * Bind live-search with debounce + Escape to clear.
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

/**
 * Initialize the portfolio filtering system.
 * @param {boolean} production — when false, sets initial status label.
 * @returns {object|undefined} MixItUp mixer instance.
 */
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