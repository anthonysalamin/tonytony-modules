// mwg011Effect.js

export function initMwg011() {
    const roots = document.querySelectorAll('.mwg011');
    if (!roots.length) return;

    waitForGSAP().then(() => {
        document.fonts.ready.then(() => {
            roots.forEach(root => setupEffect(root));
        });
    });
}

// --- helpers ---

function waitForGSAP() {
    return new Promise(resolve => {
        (function check() {
            if (window.gsap && window.ScrollTrigger) {
                resolve();
            } else {
                setTimeout(check, 50);
            }
        })();
    });
}

function setupEffect(root) {
    const text = root.querySelector('.mwg011-text');
    const container = root.querySelector('.mwg011-container');

    if (!text || !container) return;

    wrapLettersInSpan(text);

    const letters = root.querySelectorAll('.letter');

    const distance = text.clientWidth - document.body.clientWidth;

    const scrollTween = gsap.to(text, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: true,
            end: '+=' + distance
        }
    });

    letters.forEach(letter => {
        gsap.from(letter, {
            yPercent: (Math.random() - 0.5) * 400,
            rotation: (Math.random() - 0.5) * 60,
            ease: 'elastic.out(1.2, 1)',
            scrollTrigger: {
                // markers: true, // enable for debug
                trigger: letter,
                containerAnimation: scrollTween,
                start: 'left 90%',
                end: 'left 10%',
                scrub: 0.5
            }
        });
    });
}

function wrapLettersInSpan(element) {
    const text = element.textContent;

    element.innerHTML = text
        .split('')
        .map(char =>
            char === ' '
                ? '<span>&nbsp;</span>'
                : `<span class="letter">${char}</span>`
        )
        .join('');
}