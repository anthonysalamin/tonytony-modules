/**
 * TONYTONY | initSublineAnimation
 * @build 30.03.25 @updated 21:49 PHT
 */

export function initSublineAnimation() {
    // 🥭 options
    const shouldBlink = false;

    // 🥭 on load
    initTyping("[data-id='punchline']", shouldBlink, ["Developer", "Partner"]);
    
    // 🥭 on load
    initTyping("[data-id='subline']", shouldBlink, [
        "create your MVP in 24 h.",
        "master AI technologies",
        "design & develop websites",
        "develop corporate identities",
        "am a problem solver",
    ]);
}

// -------------------------
// Internal functions
// -------------------------

function addBlink(enable, selector) {
    if (!enable) return;

    const style = document.createElement("style");
    style.textContent = `
  ${selector}::after {
    content: "_";
    animation: typingBlink 1.15s linear infinite;
  }
  @keyframes typingBlink {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }`;
    document.head.appendChild(style);
}

function initTyping(selector, shouldBlink, words) {
    const el = document.querySelector(selector);
    if (!el) return;

    addBlink(shouldBlink, selector);

    const intervalTime = 20;
    const pauseTime = 1500;
    const state = { currentIndex: 0, charIndex: 0, direction: 0, typingInterval: null };
    const DIRECTION = { FORWARD: 0, BACKWARD: 1 };

    function startTyping() {
        state.typingInterval = setInterval(step, intervalTime);
    }

    function step() {
        const word = words[state.currentIndex];

        if (state.direction === DIRECTION.FORWARD) {
            state.charIndex++;
            if (state.charIndex === word.length) {
                state.direction = DIRECTION.BACKWARD;
                clearInterval(state.typingInterval);
                setTimeout(startTyping, pauseTime);
            }
        } else if (state.direction === DIRECTION.BACKWARD) {
            state.charIndex--;
            if (state.charIndex === 0) {
                state.direction = DIRECTION.FORWARD;
                state.currentIndex = (state.currentIndex + 1) % words.length;
            }
        }

        el.textContent = word.substring(0, state.charIndex);
    }

    startTyping();
}