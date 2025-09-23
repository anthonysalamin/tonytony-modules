/**
 * TONYTONY | initTimelineItemReveal
 * @build 26.10.23 @updated 15:03 PHT
 * Animates timeline items with GSAP, fading in sides and updating circle colors as they enter or leave the viewport.
 */

export function initTimelineItemReveal() {
    console.log("yo");
    const duration = 1; // 1 second
    const delay = 0.35;
    const startOpacityLeft = 0.25;
    const startOpacityRight = 0.15;
    const topOffset = 0;
    const themes = {
        light: {
            full: "var(--accent)",
            faded: "red",
        },
        dark: {
            full: "var(--accent)",
            faded: "var(--dark)",
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
        } else {
            console.log("error");
        }

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: `top+=${topOffset}px center`,
                end: "bottom top",
                markers: false, // debug
                onEnter: () => {
                    gsap.to(timelineLeft, { opacity: 1, duration: duration / 2, delay });
                    gsap.to(timelineRight, { opacity: 1, duration: duration / 2, delay });

                    if (timelineCircle.classList.contains("light")) {
                        gsap.to(timelineCircle, {
                            backgroundColor: themes.light.full,
                            duration: duration / 2,
                        });
                    } else if (timelineCircle.classList.contains("dark")) {
                        gsap.to(timelineCircle, {
                            backgroundColor: themes.dark.full,
                            duration: duration / 2,
                        });
                    } else {
                        console.log("error");
                    }
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

                    if (timelineCircle.classList.contains("light")) {
                        gsap.to(timelineCircle, {
                            backgroundColor: themes.light.faded,
                            duration: duration / 2,
                        });
                    } else if (timelineCircle.classList.contains("dark")) {
                        gsap.to(timelineCircle, {
                            backgroundColor: themes.dark.faded,
                            duration: duration / 2,
                        });
                    } else {
                        console.log("error");
                    }
                },
            }, // end scrollTrigger
        }); // end timeline

        // restart timeline
        function restartTimeline() {
            timeline.restart();
            gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
        }

        // FAQ click hack
        function manageClicksHack() {
            const faqs = document.querySelectorAll(`.process_question`);
            faqs.forEach((faq) => {
                faq.addEventListener("click", () => {
                    console.log("manageClicksHack");
                    setTimeout(restartTimeline, 500);
                });
            });
        }
        manageClicksHack();
    }); // end forEach
}