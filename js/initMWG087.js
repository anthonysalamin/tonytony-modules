/**
 * TONYTONY | initMWG087
 * Pinned horizontal scroll cards with momentum-based enter transform for `.mwg087`.
 *
 * @build 12.08.26
 * @author TONYTONY Sàrl
 * @dependencies GSAP (global `gsap`, ScrollTrigger)
 * @consumers main.js
 */

export function initMWG087() {
    const root = document.querySelector('.mwg087');

    if (!root) return;

    const container = root.querySelector('.mwg087-container');
    const cardsContainer = root.querySelector('.mwg087-cards');
    const cards = root.querySelectorAll('.mwg087-card');

    if (!container || !cardsContainer || !cards.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const distance = cardsContainer.clientWidth - window.innerWidth;

    const scrollTween = gsap.to(cardsContainer, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: true,
            start: 'top top',
            end: '+=' + distance,
        },
    });

    let transformBetweenTwoTicks = 0;
    let oldTransform = 0;

    function tick() {
        const currentTransform = gsap.getProperty(cardsContainer, 'x');
        transformBetweenTwoTicks = currentTransform - oldTransform;
        oldTransform = currentTransform;
    }

    cards.forEach((card) => {
        ScrollTrigger.create({
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 100%',
            end: 'right 0%',
            onEnter: () => {
                transformCard(card.children[0]);
            },
            onEnterBack: () => {
                transformCard(card.children[0]);
            },
        });
    });

    function transformCard(el) {
        gsap.fromTo(
            el,
            {
                xPercent: -transformBetweenTwoTicks * 3,
            },
            {
                xPercent: 0,
                ease: 'power3.out',
                duration: 0.7,
            },
        );
    }

    // PLAY/PAUSE TICKER WHEN IN/OFF SCREEN
    ScrollTrigger.create({
        trigger: root,
        onEnter: () => {
            gsap.ticker.add(tick);
        },
        onLeave: () => {
            gsap.ticker.remove(tick);
        },
        onEnterBack: () => {
            gsap.ticker.add(tick);
        },
        onLeaveBack: () => {
            gsap.ticker.remove(tick);
        },
    });

    // KILL
    const observer = new MutationObserver((mutations) => {
        const isRootRemoved = mutations.some(
            (mutation) =>
                mutation.type === 'childList' &&
                Array.from(mutation.removedNodes).includes(root),
        );

        if (isRootRemoved) {
            gsap.ticker.remove(tick);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
