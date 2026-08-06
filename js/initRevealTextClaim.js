/**
 * TONYTONY | initializeTextRevealAnimation
 * Splits each matched element with SplitText and scrubs word opacity from dim to full across ScrollTrigger.
 *
 * @build 12.04.26
 * @updated 06.08.26 PHT
 * @author TONYTONY Sàrl
 * @dependencies GSAP (ScrollTrigger, SplitText)
 */

function initializeTextRevealAnimation(targetConfig, animationConfig, isProduction) {
    const targetElements = document.querySelectorAll(targetConfig.SELECTOR);
    // Primer fires when element top hits this Y (e.g. 120% of viewport height).
    const primeLine = window.innerHeight * (parseFloat(targetConfig.PRIME.VIEWPORT) / 100);

    targetElements.forEach(element => {
        // Already past the primer on load (in view or in the pre-viewport band):
        // skip split + dim so words never land at opacity 0.1 without a user
        // scroll — that state is what mobile Lighthouse flags for contrast.
        if (element.getBoundingClientRect().top < primeLine) return;

        // 1. Split text into whole words
        // 2. Wrap them in <span> tags for SEO safety and HTML validation
        const splitTextInstance = new SplitText(element, {
            type: "words",
            tag: "span",
            aria: "none"
        });

        const words = splitTextInstance.words;

        // Primer: words stay at full opacity on load (readable + passes contrast
        // audits, which never scroll). They are only dimmed to 0.1 shortly before
        // the element enters the viewport, so the reveal scrub has a dim starting
        // point without any pop. Scrolling back above the primer restores full opacity.
        ScrollTrigger.create({
            trigger: element,
            start: `${targetConfig.START.ELEMENT} ${targetConfig.PRIME.VIEWPORT}`,
            onEnter: () => gsap.set(words, { opacity: 0.1 }),
            onLeaveBack: () => gsap.set(words, { opacity: 1 }),
            markers: !isProduction
        });

        // Reveal: scrub words from dim to full across the trigger range.
        // immediateRender:false leaves the initial state to the primer above.
        gsap.fromTo(words,
            { opacity: 0.1 },
            {
                opacity: 1,
                duration: animationConfig.DURATION,
                stagger: animationConfig.STAGGER,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                    trigger: element,
                    start: `${targetConfig.START.ELEMENT} ${targetConfig.START.VIEWPORT}`,
                    end: `bottom ${targetConfig.END.VIEWPORT}`,
                    scrub: 0.8,
                    markers: !isProduction,
                    toggleActions: "play play reverse reverse"
                }
            }
        );
    });
}

/**
 * TONYTONY | initRevealTextClaim
 * Boots configured text and claim reveal targets when their selectors exist, delegating to the shared animator.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
export function initRevealTextClaim() {
    // Respect users who prefer reduced motion: skip splitting/dimming entirely
    // so text stays at full opacity and readable.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Configuration object with all animation settings
    const REVEAL_CONFIG = {
        PRODUCTION: true,

        // Common animation properties
        ANIMATION_SETTINGS: {
            TYPE: "words", // Updated to reflect word-level animation
            DURATION: 0.3,
            STAGGER: 0.05 // Increased slightly since words animate faster overall than chars
        },

        // Target element configurations
        ANIMATION_TARGETS: [
            {
                SELECTOR: '[data-reveal="text"]',
                START: {
                    ELEMENT: "top",
                    VIEWPORT: "95%"
                },
                // Dim words 20vh below the viewport bottom, before the reveal starts
                PRIME: {
                    VIEWPORT: "120%"
                },
                END: {
                    VIEWPORT: "92%"
                }
            },
            {
                SELECTOR: '[data-reveal="claim"]',
                START: {
                    ELEMENT: "top",
                    VIEWPORT: "80%"
                },
                // Dim words 20vh below the viewport bottom, before the reveal starts
                PRIME: {
                    VIEWPORT: "120%"
                },
                END: {
                    VIEWPORT: "center"
                }
            }
        ]
    };

    // Safety check: Filter out targets that don't exist in the DOM
    const existingTargets = REVEAL_CONFIG.ANIMATION_TARGETS.filter(targetConfig =>
        document.querySelector(targetConfig.SELECTOR)
    );

    if (!existingTargets.length) {
        console.log("Reveal animation skipped: no matching target elements found");
        return;
    }

    // Initialize animations for each valid target
    existingTargets.forEach(targetConfig => {
        initializeTextRevealAnimation(
            targetConfig,
            REVEAL_CONFIG.ANIMATION_SETTINGS,
            REVEAL_CONFIG.PRODUCTION
        );
    });
}