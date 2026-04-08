/**
 * UTILITY | initRevealTextClaim
 * @build 11.09.25 @updated 11:12 PHT
 * Reveals text and claims on scroll by fading characters from low-opacity to full color, with staggered animation.
 */

function convertToRgbaWithAlpha(colorString, alphaValue) {
    const rgbaMatch = colorString.match(/rgba?\((\d+), (\d+), (\d+),? ?([\d\.]*)?\)/);

    if (rgbaMatch) {
        const [, redValue, greenValue, blueValue] = rgbaMatch;
        return `rgba(${redValue}, ${greenValue}, ${blueValue}, ${alphaValue})`;
    }

    return colorString;
}

function getElementRealHeight(element) {
    return element.offsetHeight;
}

function initializeTextRevealAnimation(targetConfig, animationConfig, isProduction) {
    const targetElements = document.querySelectorAll(targetConfig.SELECTOR);

    targetElements.forEach(element => {
        // Split text into individual characters for animation
        const splitTextInstance = new SplitText(element, {
            type: "words,chars"
        });

        // Store original colors of each character
        const originalCharacterColors = splitTextInstance.chars.map(char =>
            window.getComputedStyle(char).color
        );

        // Set initial low-opacity state for all characters
        splitTextInstance.chars.forEach((char, index) => {
            const fadedColor = convertToRgbaWithAlpha(originalCharacterColors[index], 0.1);
            gsap.set(char, {
                color: fadedColor
            });
        });

        // Create scroll-triggered animation to reveal characters
        gsap.fromTo(splitTextInstance.chars,
            {
                // From: low opacity colors
                color: (index) => convertToRgbaWithAlpha(originalCharacterColors[index], 0.1)
            },
            {
                // To: original full opacity colors
                color: (index) => originalCharacterColors[index],
                duration: animationConfig.DURATION,
                stagger: animationConfig.STAGGER,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: `${targetConfig.START.ELEMENT} ${targetConfig.START.VIEWPORT}`,
                    end: `bottom ${targetConfig.END.VIEWPORT}`,
                    scrub: true,
                    markers: !isProduction, // Show markers only in development
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