/**
 * PORTFOLIO | initMixItUp
 * @build 22.09.25 @updated 16:58 PHT
 * Sets up portfolio filtering with MixItUp by converting Webflow content to CSS classes.
 */

export function initMixItUp(production = false) {
    setDataAttribute();
    filterChecked();
    featToClass();
    categToClass();
    titleToClass();
    mixItUp(production);
}

/**
 * Clean and normalize string for CSS class names
 * Removes accents, special characters, and converts to lowercase
 */
function cleanAndTransformString(str) {
    const accentMap = {
        ä: "a", Ä: "a",
        à: "a", À: "a",
        é: "e", É: "e",
        è: "e", È: "e",
        ö: "o", Ö: "o",
        ü: "u", Ü: "u"
    };

    let cleanedString = str;
    for (const accentChar in accentMap) {
        const normalChar = accentMap[accentChar];
        const accentRegex = new RegExp(accentChar, "g");
        cleanedString = cleanedString.replace(accentRegex, normalChar);
    }

    return cleanedString
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();
}

/**
 * Set filter buttons with normalized data attributes
 * Converts button text content to CSS selector format
 */
function setDataAttribute() {
    const controls = document.getElementById("mixitup-controls");
    if (!controls) return;

    const buttons = controls.querySelectorAll('[data-filter=""]');
    Array.from(buttons).forEach((button) => {
        const content = button.textContent;
        const contentCleaned = cleanAndTransformString(content);
        button.setAttribute("data-filter", `.${contentCleaned}`);
    });
}

/**
 * Manage button state for filter controls
 * Handles active/checked state switching
 */
function filterChecked() {
    const controls = document.getElementById("mixitup-controls");
    if (!controls) return;

    const buttons = document.getElementsByClassName("filter");
    Array.from(buttons).forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.currentTarget;
            if (!target.classList.contains("checked")) {
                // Remove checked from current active button
                const currentChecked = controls.querySelector(".filter.checked");
                if (currentChecked) {
                    currentChecked.classList.remove("checked");
                }
                // Add checked to clicked button
                target.classList.add("checked");
            }
        });
    });
}

/**
 * Convert Webflow switch "featuring" into CSS combo class
 * Adds featuring status as a class to portfolio items
 */
function featToClass() {
    const mixes = document.querySelectorAll(".mixitup__collection-item");
    Array.from(mixes).forEach((mix) => {
        const featuringElement = mix.querySelector(".mixitup__featuring");
        if (featuringElement && !featuringElement.classList.contains("w-condition-invisible")) {
            const stringFeat = featuringElement.textContent;
            const classNameFeat = stringFeat.replace(/\s+/g, "").toLowerCase();
            mix.classList.add(classNameFeat);
        }
    });
}

/**
 * Convert Webflow text field "category" into CSS combo class
 * Adds category names as classes to portfolio items
 */
function categToClass() {
    const mixes = document.getElementsByClassName("mixitup__collection-item");
    Array.from(mixes).forEach((mix) => {
        const categories = mix.querySelectorAll(".mixitup__category");
        categories.forEach((category) => {
            const classNameCateg = cleanAndTransformString(category.textContent);
            mix.classList.add(classNameCateg);
        });
    });
}

/**
 * Convert Webflow text field "title" into CSS combo class
 * Adds title as a searchable class to portfolio items
 */
function titleToClass() {
    const mixes = document.getElementsByClassName("mixitup__collection-item");
    Array.from(mixes).forEach((mix) => {
        const titleElement = mix.querySelector(".mixitup__title");
        if (titleElement) {
            const stringTitle = titleElement.textContent;
            const cleanTitle = stringTitle.split(" ").join("").toLowerCase().trim();
            mix.classList.add(cleanTitle);
        }
    });
}

/**
 * Refresh ScrollTrigger with proper timing
 * Ensures DOM is fully settled before refresh
 */
function refreshScrollTrigger() {
    // Multiple approaches for maximum reliability
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            });
        });
    });

    // Backup timeout method for extra reliability
    setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 100);
}

/**
 * Handle successful mix completion
 * Updates status and refreshes ScrollTrigger
 */
function handleMixEnd(mixer) {
    const totalItems = document.querySelectorAll(".mixitup__collection-item").length;
    const filteredItems = mixer.getState().totalShow;
    const displayElement = document.querySelector("#status");

    if (displayElement) {
        displayElement.textContent = `${filteredItems} result${filteredItems > 1 ? "s" : ""}`;
    }

    // Refresh ScrollTrigger after DOM is fully settled
    refreshScrollTrigger();
}

/**
 * Handle mix failure
 * Shows error message and resets to show all items
 */
function handleMixFail(mixer) {
    const statusElement = document.querySelector('[data-mixitup="status"]');
    if (statusElement) {
        statusElement.textContent = "No matching item to display.";
    }

    // Reset to show all items after a brief delay
    setTimeout(() => {
        mixer.filter("*");
        // Refresh ScrollTrigger after reset
        setTimeout(() => {
            refreshScrollTrigger();
        }, 200);
    }, 1000);
}

/**
 * Filter items by search string
 * Handles both search and reset functionality
 */
function filterByString(mixer, searchValue) {
    if (searchValue) {
        mixer.filter(`[class*="${searchValue}"]`);
    } else {
        // Reset to featured items when search is cleared
        const currentChecked = document.querySelector(".filter.checked");
        if (currentChecked) {
            currentChecked.classList.remove("checked");
        }

        const featuredButton = document.querySelector("[data-filter*='featuring']");
        if (featuredButton) {
            featuredButton.classList.add("checked");
            mixer.filter(".featuring");
        } else {
            mixer.filter("*");
        }
    }

    // Refresh ScrollTrigger after search filter
    setTimeout(() => {
        refreshScrollTrigger();
    }, 500);
}

/**
 * Initialize MixItUp 3 with search module
 * Main initialization function
 */
function mixItUp(production) {
    const container = document.getElementById("mixitup-container");
    const inputSearch = document.getElementById("mixitup-search");
    const status = document.getElementById("status");

    // Early return if required elements don't exist
    if (!container) {
        // console.warn("MixItUp: Container element not found");
        return;
    }

    let keyupTimeout, searchValue;

    // Set initial status
    if (!production && status) {
        status.innerHTML = "Case studies";
    }

    // Initialize MixItUp with enhanced configuration
    const mixer = mixitup(container, {
        load: {
            filter: ".featuring"
        },
        selectors: {
            target: ".mixitup__collection-item"
        },
        animation: {
            duration: 450,
            nudge: true,
            reverseOut: true,
            effects: "fade scale(0.77) translateZ(-68px) stagger(6ms)"
        },
        callbacks: {
            onMixStart: () => {
                if (status) {
                    status.textContent = "Searching...";
                }
            },
            onMixEnd: () => handleMixEnd(mixer),
            onMixFail: () => handleMixFail(mixer)
        }
    });

    // Set up live search functionality
    if (inputSearch) {
        inputSearch.addEventListener("keyup", () => {
            searchValue = inputSearch.value.length < 1
                ? ""
                : inputSearch.value.toLowerCase().trim();

            // Clear previous timeout
            clearTimeout(keyupTimeout);

            // Debounce search to avoid excessive filtering
            keyupTimeout = setTimeout(() => {
                filterByString(mixer, searchValue);
            }, 350);
        });

        // Clear search on escape key
        inputSearch.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                inputSearch.value = "";
                filterByString(mixer, "");
            }
        });
    }

    // Initial ScrollTrigger refresh after setup
    setTimeout(() => {
        refreshScrollTrigger();
    }, 100);

    return mixer; // Return mixer instance for external access
}