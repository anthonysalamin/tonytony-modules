/**
 * PORTFOLIO | MixItUp v.2 (ES6 Module)
 * Build: 22.09.2025 @16:58
 */

export function initMixItUp(production = false) {
    // addCheckedOnLoad();
    setDataAttribute();
    filterChecked();
    featToClass();
    categToClass();
    titleToClass();
    mixItUp(production);
}

// 🥑 add "checked" to first filter on load
function addCheckedOnLoad() {
    const parentElement = document.querySelector(".filter__collection-list");
    parentElement.querySelector(".filter").classList.add("checked");
}

// 🥒 clean + normalize string
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

// 🍊 set filter buttons with normalized data attributes
function setDataAttribute() {
    const controls = document.getElementById("mixitup-controls");
    const buttons = controls.querySelectorAll('[data-filter=""]');
    Array.from(buttons).forEach((button) => {
        const content = button.textContent;
        const contentCleaned = cleanAndTransformString(content);
        button.setAttribute("data-filter", `.${contentCleaned}`);
    });
}

// 🥑 manage button state
function filterChecked() {
    const controls = document.getElementById("mixitup-controls");
    const buttons = document.getElementsByClassName("filter");
    Array.from(buttons).forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.currentTarget;
            if (target.classList != "filter checked") {
                controls.querySelector(".filter.checked").classList.remove("checked");
                target.classList.add("checked");
            }
        });
    });
}

// 🍅 convert wf switch "featuring" into CSS comboclass
function featToClass() {
    const mixes = document.querySelectorAll(".mixitup__collection-item");
    Array.from(mixes).forEach((mix) => {
        const featuringElement = mix.querySelector(".mixitup__featuring");
        if (
            featuringElement &&
            !featuringElement.classList.contains("w-condition-invisible")
        ) {
            const stringFeat = featuringElement.textContent;
            const classNameFeat = stringFeat.replace(/\s+/g, "").toLowerCase();
            mix.classList.add(classNameFeat);
        }
    });
}

// 🌽 convert wf text field "category" into CSS comboclass
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

// 🍆 convert wf text field "title" into CSS comboclass
function titleToClass() {
    const mixes = document.getElementsByClassName("mixitup__collection-item");
    Array.from(mixes).forEach((mix) => {
        const stringTitle = mix.querySelector(".mixitup__title").textContent;
        mix.classList.add(stringTitle.split(" ").join("").toLowerCase().trim());
    });
}

// 🍋 initialize MixItUp 3 (with search module)
function mixItUp(production) {
    const container = document.getElementById("mixitup-container"),
        inputSearch = document.getElementById("mixitup-search"),
        status = document.getElementById("status");

    let keyupTimeout, searchValue;
    if (!production) status.innerHTML = "Portfolio";

    const mixer = mixitup(container, {
        load: { filter: ".featuring" },
        selectors: { target: ".mixitup__collection-item" },
        animation: {
            duration: 450,
            nudge: true,
            reverseOut: true,
            effects: "fade scale(0.77) translateZ(-68px) stagger(6ms)"
        },
        callbacks: {
            onMixStart: () => { status.textContent = "Searching..."; },
            onMixEnd: () => handleMixEnd(mixer),
            onMixFail: () => handleMixFail(mixer)
        }
    });

    // 🥤 live search
    inputSearch.addEventListener("keyup", () => {
        searchValue = inputSearch.value.length < 1
            ? ""
            : inputSearch.value.toLowerCase().trim();
        clearTimeout(keyupTimeout);
        keyupTimeout = setTimeout(() => filterByString(mixer, searchValue), 350);
    });
}

// 🥬 helpers
function handleMixEnd(mixer) {
    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
    const totalItems = document.querySelectorAll(".mixitup__collection-item").length;
    const filteredItems = mixer.getState().totalShow;
    const displayElement = document.querySelector("#status");
    if (displayElement) {
        displayElement.textContent = `${filteredItems} result${filteredItems > 1 ? "s" : ""}`;
    }
}

function handleMixFail(mixer) {
    document.querySelector("#status").textContent = "No matching item to display.";
    setTimeout(() => {
        setTimeout(() => mixer.filter("*"), 150);
    }, 250);
}

function filterByString(mixer, searchValue) {
    if (searchValue) {
        mixer.filter(`[class*="${searchValue}"]`);
    } else {
        document.querySelector(".filter.checked").classList.remove("checked");
        document
            .querySelector("[data-filter='.mixitup__featuring']")
            .classList.add("checked");
        mixer.filter(".mixitup__featuring");
    }
}