/**
 * TONYTONY | initLogoTyped
 * Collapses the dual TONY wordmarks into the monogram after 10px of scroll and restores them when scrolling back up.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initLogoTyped() {
    const p1 = document.querySelector('[data-id="1st TONY"]');
    const p2 = document.querySelector('[data-id="2nd TONY"]');

    if (!p1 || !p2) return;

    const full = 'TONY';
    const steps = full.length - 1;
    let state = 'expanded';
    let animating = false;

    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animateTyping(direction) {
        if (animating) return;
        animating = true;

        const duration = 400;
        const start = performance.now();
        const fromLen = direction === 'collapse' ? full.length : 1;
        const toLen = direction === 'collapse' ? 1 : full.length;
        let lastRenderedLen = fromLen;

        function frame(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = easeInOut(t);
            const len = Math.round(fromLen + (toLen - fromLen) * eased);

            if (len !== lastRenderedLen) {
                p1.textContent = full.slice(0, len);
                p2.textContent = full.slice(0, len);
                lastRenderedLen = len;
            }

            if (t < 1) {
                requestAnimationFrame(frame);
            } else {
                state = direction === 'collapse' ? 'collapsed' : 'expanded';
                animating = false;
            }
        }

        requestAnimationFrame(frame);
    }

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        if (state === 'expanded' && !animating && scrollY > 10) {
            animateTyping('collapse');
        } else if (state === 'collapsed' && !animating && scrollY <= 10) {
            animateTyping('expand');
        }
    });
}