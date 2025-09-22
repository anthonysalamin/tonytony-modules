/**
 * PORTFOLIO | initFAQModule
 * @build 30.12.2023 @updated 14:11 CEST
 */

export function initFAQModule() {
    document.addEventListener("DOMContentLoaded", initFAQ);

    function initFAQ() {
        const questions = document.querySelectorAll(".faq__question");
        if (questions.length === 0) return;

        gsap.set(".faq__answer", { height: 0, overflow: "hidden", duration: 0 });

        function openFirstFAQ() {
            questions[0].click();
        }

        setTimeout(openFirstFAQ, 250);

        questions.forEach((question) => {
            let isOpen = false;

            question.addEventListener("click", () => {
                const icon = question.querySelector(`.icon-plus`);
                const answer = question.nextElementSibling;

                if (isOpen) {
                    collapseAnswer(answer, icon);
                } else {
                    expandAnswer(answer, icon);
                }

                isOpen = !isOpen;
            });
        });
    }

    function expandAnswer(answer, icon) {
        gsap.set(answer, { height: "auto" });
        const height = answer.clientHeight;
        gsap.from(answer, { height: 0, duration: 0.3, ease: "ease-in" });
        gsap.to(icon, { rotationZ: 45, duration: 0.3, ease: "ease-out" });
    }

    function collapseAnswer(answer, icon) {
        gsap.to(answer, { height: 0, duration: 0.3, ease: "ease-out" });
        gsap.to(icon, { rotationZ: 0, duration: 0.3, ease: "ease-in" });
    }
}