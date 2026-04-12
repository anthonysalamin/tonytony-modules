/**
 * TONYTONY | initContactForm
 * Disables the Basin contact submit control, swaps its label to the wait copy, and dims it to block duplicate posts.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
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