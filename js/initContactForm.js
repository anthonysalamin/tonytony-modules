/**
 * TONYTONY | initContactForm
 * Handles contact form submission state — disables the submit button, swaps its label to a waiting message, and reduces opacity to prevent duplicate submissions.
 * @build 09.04.26
 * @updated 11:04 PHT
 */

export function initContactForm() {
    const contactForm = document.querySelector(`[data-basin-form="true"]`);
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const submitBtn = contactForm.querySelector('[type="submit"]');
            if (submitBtn) {
                submitBtn.dataset.originalValue = submitBtn.value;
                submitBtn.value = submitBtn.getAttribute('data-wait') || 'One moment...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.style.pointerEvents = 'none';
            }
        });
    }
}