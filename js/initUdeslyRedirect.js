/**
 * PORTFOLIO | initUdeslyRedirect
 * @build 10.01.204 @updated 16:23
 * Redirects all [data-basin-form="true"] forms to a success page once they’re submitted and hidden.
 */

export function initUdeslyRedirect() {
    const forms = document.querySelectorAll('[data-basin-form="true"]');
    if (!forms.length) return;

    const successURL = `https://tonytony.ch/success/`;

    forms.forEach((form) => {
        observeFormDisplay(form, successURL);
    });

    function observeFormDisplay(form, successURL) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.attributeName === "style" &&
                    form.style.display === "none"
                ) {
                    window.open(successURL, "_self");
                }
            });
        });
        observer.observe(form, { attributes: true });
    } // end observeFormDisplay(form)
}