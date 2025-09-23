/**
 * UTILITY | initTimelineItemReveal
 * @build 26.10.23 @updated 15:03 PHT
 * Animates timeline items with GSAP, fading in sides and updating circle colors as they enter or leave the viewport.
 */

export function initTimelineItemReveal() {
    const duration = 1; // 1 second
    const delay = 0.35;
    const startOpacityLeft = 0.25;
    const startOpacityRight = 0.15;
    const topOffset = 0;

    // 🥬 Utility: get CSS variable as rgba with opacity
    function getCssVarWithOpacity(varName, opacity = 1) {
        const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

        // Convert hex (#rrggbb or #rgb)
        if (value.startsWith("#")) {
            let r, g, b;
            if (value.length === 4) {
                r = parseInt(value[1] + value[1], 16);
                g = parseInt(value[2] + value[2], 16);
                b = parseInt(value[3] + value[3], 16);
            } else {
                r = parseInt(value.slice(1, 3), 16);
                g = parseInt(value.slice(3, 5), 16);
                b = parseInt(value.slice(5, 7), 16);
            }
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }

        // rgb() or rgba()
        if (value.startsWith("rgb")) {
            return value.replace(/rgb(a?)\(([^)]+)\)/, (_, a, colors) => {
                const [r, g, b] = colors.split(",").map(c => parseFloat(c));
                return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            });
        }

        return value; // fallback
    }

    const themes = {
        light: {
            full: "var(--accent)",
            faded: getCssVarWithOpacity("--accent", 0.5), // 50% opacity
        },
        dark: {
            full: "var(--accent)",
            faded: getCssVarWithOpacity("--accent", 0.5), // 50% opacity
        },
    };

    const triggers = document.querySelectorAll(`.timeline__item`);
    if (triggers.length === 0) return;

    triggers.forEach((trigger) => {
        const timelineLeft = trigger.querySelector(`.timeline__left`);
        const timelineRight = trigger.querySelector(`.timeline__right`);
        const timelineCircle = trigger.querySelector(`.timeline__circle`);

        // initial state
        gsap.to(timelineLeft, { opacity: startOpacityLeft, duration });
        gsap.to(timelineRight, { opacity: startOpacityRight, duration });

        if (timelineCircle.classList.contains("light")) {
            gsap.to(timelineCircle, {
                backgroundColor: themes.light.faded,
                duration,
            });
        } else if (timelineCircle.classList.contains("dark")) {
            gsap.to(timelineCircle, {
                backgroundColor: themes.dark.faded,
                duration,
            });
        }

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: `top+=${topOffset}px center`,
                end: "bottom top",
                markers: false,
                onEnter: () => {
                    gsap.to(timelineLeft, { opacity: 1, duration: duration / 2, delay });
                    gsap.to(timelineRight, { opacity: 1, duration: duration / 2, delay });

                    gsap.to(timelineCircle, {
                        backgroundColor: themes.light.full,
                        duration: duration / 2,
                    });
                },
                onLeaveBack: () => {
                    gsap.to(timelineLeft, {
                        opacity: startOpacityLeft,
                        duration: duration / 2,
                        delay,
                    });
                    gsap.to(timelineRight, {
                        opacity: startOpacityRight,
                        duration: duration / 2,
                        delay,
                    });

                    gsap.to(timelineCircle, {
                        backgroundColor: themes.light.faded,
                        duration: duration / 2,
                    });
                },
            },
        });

        // restart timeline
        function restartTimeline() {
            timeline.restart();
            gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
        }

        // FAQ click hack
        const faqs = document.querySelectorAll(`.process_question`);
        faqs.forEach((faq) => {
            faq.addEventListener("click", () => {
                setTimeout(restartTimeline, 500);
            });
        });
    });
}