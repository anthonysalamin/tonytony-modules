/**
 * TONYTONY | 🥭 initAskClaude
 * Wires up the "Ask Claude if we're a fit" CTA: opens Claude Desktop
 * with the evaluation prompt prefilled via the claude:// deep link.
 * Falls back to clipboard copy + claude.ai/new when Desktop is absent.
 *
 * @build 09.07.26
 * @updated 09.07.26 PHT
 * @author TONYTONY Sàrl
 */

const ASK_CLAUDE_PROMPT = `I'm looking for a web design and development partner.
Please help me objectively evaluate whether TONYTONY (https://tonytony.ch) is a good fit for my project.
Here's what I'm looking for:
- A custom website (not a template)
- Strong SEO and Answer Engine Optimization (AEO)
- Fast performance
- Creative design
- Webflow development
- Long-term support
Visit their website, analyze their portfolio, services and positioning.
Then tell me:
1. What they're particularly good at.
2. What type of client they're probably NOT suited for.
3. Whether they'd be a good fit for my project.
4. What questions I should ask them before hiring them.
5. Give me an unbiased recommendation.`;

/**
 * Copies text to the clipboard, using the async Clipboard API with a
 * document.execCommand fallback for older/locked-down browsers.
 *
 * @param {string} text
 * @returns {Promise<void>}
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    }
    fallbackCopy(text);
    return Promise.resolve();
}

/**
 * @param {string} text
 */
function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
    } catch (e) {
        // Silently ignore — nothing more we can do without clipboard access.
    }
    document.body.removeChild(ta);
}

/**
 * @param {string} prompt
 * @returns {string}
 */
function buildClaudeDesktopUrl(prompt) {
    return `claude://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}

/**
 * Opens Claude Desktop with a prefilled prompt. If the app does not
 * launch (page stays focused), copies the prompt and opens claude.ai.
 *
 * @param {string} prompt
 * @param {string} webFallbackUrl
 */
function openClaudeWithPrompt(prompt, webFallbackUrl) {
    let appLaunched = false;
    const onBlur = () => {
        appLaunched = true;
    };
    window.addEventListener('blur', onBlur);

    window.location.href = buildClaudeDesktopUrl(prompt);

    window.setTimeout(() => {
        window.removeEventListener('blur', onBlur);
        if (appLaunched) return;

        copyToClipboard(prompt).then(() => {
            window.open(webFallbackUrl, '_blank', 'noopener');
        });
    }, 1500);
}

/**
 * Initializes the Ask Claude CTA. Looks for a trigger button in the
 * DOM and wires up a click handler that opens Claude Desktop with the
 * prompt prefilled, or falls back to clipboard + claude.ai/new.
 *
 * @param {Object} [options]
 * @param {string} [options.buttonSelector='[data-button="ask-claude"]']
 * @param {string} [options.claudeWebUrl='https://claude.ai/new']
 */
export function initAskClaude({
    buttonSelector = '[data-button="ask-claude"]',
    claudeWebUrl = 'https://claude.ai/new',
} = {}) {
    const btn = document.querySelector(buttonSelector);
    if (!btn) {
        console.warn(`initAskClaude: no ${buttonSelector} found, skipping`);
        return;
    }

    btn.addEventListener('click', () => {
        openClaudeWithPrompt(ASK_CLAUDE_PROMPT, claudeWebUrl);
    });
}
