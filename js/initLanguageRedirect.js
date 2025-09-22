/**
 * PORTFOLIO | initLanguageRedirect
 * @build 05.02.24 @updated 11:17 CEST
 */

export function initLanguageRedirect() {
    const production = true;

    const urls = { en: ``, fr: `fr`, de: `de` };

    document.addEventListener("DOMContentLoaded", () => {
        if (production) {
            console.log("production");
            performCheck(urls);
        } else {
            console.log("development");
            redirectBasedOnLanguage(urls);
        }
    });

    function performCheck(urls) {
        const currentUrl = window.location.href;
        const targetUrls = [
            "https://anthonysalamin.webflow.io/",
            "https://anthonysalamin.ch/"
        ];

        if (targetUrls.includes(currentUrl)) {
            console.log("Current URL is equal to one of the target URLs.");
            redirectBasedOnLanguage(urls);
        } else {
            console.log("Current URL is not equal to any of the target URLs.");
            return;
        }
    }

    function getBrowserLanguage() {
        return navigator.language || navigator.userLanguage;
    }

    function log(userLanguage, languageStatus) {
        console.log(`language is ${userLanguage}`);
    }

    function getCurrentURL() {
        return window.location.href;
    }

    function redirectBasedOnLanguage(urls) {
        const currentURL = getCurrentURL();
        console.log(currentURL);

        const languageStatus = document.querySelector(`#language`);
        const userLanguage = getBrowserLanguage();

        if (userLanguage.startsWith("fr")) {
            log(userLanguage, languageStatus);
            window.location.href = `${currentURL}${urls.fr}`;
        } else if (userLanguage.startsWith("de")) {
            log(userLanguage, languageStatus);
            window.location.href = `${currentURL}${urls.de}`;
        } else {
            log(userLanguage, languageStatus);
            return;
        }
    }
}