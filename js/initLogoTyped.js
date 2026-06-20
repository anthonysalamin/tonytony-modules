/**
 * TONYTONY | initLogoTyped
 * Collapses the logo wordmark from TONYTONY into the TNT monogram after 10px of scroll and restores it when scrolling back up.
 *
 * @build 21.06.26
 * @updated 21.06.26 PHT
 * @author TONYTONY Sàrl
 */

export function initLogoTyped() {
    const el = document.querySelector("[data-typed='logo']");
    if (!el) return;

    const collapseFrames = ['TONYTONY', 'TNYTNY', 'TNTN', 'TNT'];
    const expandFrames = ['TNT', 'TNTN', 'TNYTNY', 'TONYTONY'];

    let state = 'expanded';
    let animating = false;

    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animateTyping(direction) {
        if (animating) return;
        animating = true;

        const frames = direction === 'collapse' ? collapseFrames : expandFrames;
        const duration = 400;
        const start = performance.now();
        let lastIndex = 0;

        function frame(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = easeInOut(t);
            const index = Math.round(eased * (frames.length - 1));

            if (index !== lastIndex) {
                el.textContent = frames[index];
                lastIndex = index;
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
