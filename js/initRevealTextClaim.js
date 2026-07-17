/**
 * TONYTONY | initializeTextRevealAnimation
 * Splits each matched element with SplitText and scrubs word opacity from dim to full across ScrollTrigger.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 * @dependencies GSAP (ScrollTrigger, SplitText)
 */

function initializeTextRevealAnimation(targetConfig, animationConfig, isProduction) {
    const targetElements = document.querySelectorAll(targetConfig.SELECTOR);

    targetElements.forEach(element => {
        // 1. Split text into whole words
        // 2. Wrap them in <span> tags for SEO safety and HTML validation
        const splitTextInstance = new SplitText(element, {
            type: "words",
            tag: "span",
            aria: "none"
        });

        // Set initial low-opacity state for all words
        gsap.set(splitTextInstance.words, { opacity: 0.1 });

        // Animate words instead of characters
        gsap.fromTo(splitTextInstance.words,
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
 * TONYTONY | initRevealTextClaim
 * Boots configured text and claim reveal targets when their selectors exist, delegating to the shared animator.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */
export function initRevealTextClaim() {
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