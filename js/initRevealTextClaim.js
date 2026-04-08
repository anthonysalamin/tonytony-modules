/**
 * UTILITY | initRevealTextClaim
 * @build 11.09.25 @updated 08.04.26 PHT
 * Reveals text and claims on scroll by fading characters from low opacity to full opacity, with staggered animation.
 * Uses opacity instead of color so characters inherit the current theme color from the cascade.
 */

function initializeTextRevealAnimation(targetConfig, animationConfig, isProduction) {
    const targetElements = document.querySelectorAll(targetConfig.SELECTOR);

    targetElements.forEach(element => {
        const splitTextInstance = new SplitText(element, {
            type: "words,chars"
        });

        gsap.set(splitTextInstance.chars, { opacity: 0.1 });

        gsap.fromTo(splitTextInstance.chars,
            { opacity: 0.1 },
            {
                opacity: 1,
                duration: animationConfig.DURATION,
                stagger: animationConfig.STAGGER,
                ease: "none",
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
 * Main initialization function for text reveal animations
 * Sets up reveal animations for both regular text and claim elements
 */
export function initRevealTextClaim() {
    // Configuration object with all animation settings
    const REVEAL_CONFIG = {
        PRODUCTION: true,

        // Common animation properties
        ANIMATION_SETTINGS: {
            TYPE: "words, chars",
            DURATION: 0.3,
            STAGGER: 0.02
        },

        // Target element configurations
        ANIMATION_TARGETS: [
            {
                SELECTOR: '[data-reveal="text"]',
                START: {
                    ELEMENT: "top",
                    VIEWPORT: "95%"
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