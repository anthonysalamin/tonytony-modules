/**
 * TONYTONY | initUdeslyRedirect
 * Observes Basin forms and sends the browser to the success URL once the submitted form node is hidden.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
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