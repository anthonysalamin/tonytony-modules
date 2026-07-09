/**
 * TONYTONY | 🥭 initAskChatGPT
 * Wires up the "Ask ChatGPT if we're a fit" CTA: opens the ChatGPT app
 * (or chatgpt.com) with the evaluation prompt prefilled via ?q=.
 * Prompt language follows the URL (/fr/, /de/, default en).
 * Falls back to clipboard copy + chatgpt.com when nothing opens.
 *
 * @build 09.07.26
 * @updated 09.07.26 PHT
 * @author TONYTONY Sàrl
 */

const ASK_CHATGPT_PROMPTS = {
    en: `I'm looking for a web design and development partner.
Please help me objectively evaluate whether TONYTONY (https://tonytony.ch) is a good fit for my project.
Here's what I'm looking for:
- A custom website (not a template)
- Strong SEO and Answer Engine Optimization (AEO)
- Fast performance
- Creative design
- Webflow development
Visit their website, analyze their portfolio, services and positioning.
Then tell me:
1. What they're particularly good at.
2. Whether they'd be a good fit for my project.
3. What questions I should ask them before hiring them.
4. Give me an unbiased recommendation.`,
    fr: `Je recherche un partenaire en design web et développement.
Aidez-moi à évaluer objectivement si TONYTONY (https://tonytony.ch) correspond bien à mon projet.
Voici ce que je recherche :
- Un site web sur mesure (pas un template)
- Un SEO solide et de l'Answer Engine Optimization (AEO)
- D'excellentes performances
- Un design créatif
- Du développement Webflow
Visitez leur site, analysez leur portfolio, leurs services et leur positionnement.
Puis dites-moi :
1. Dans quoi ils excellent particulièrement.
2. S'ils seraient un bon choix pour mon projet.
3. Quelles questions je devrais leur poser avant de les engager.
4. Donnez-moi une recommandation objective.`,
    de: `Ich suche einen Partner für Webdesign und Entwicklung.
Bitte hilf mir objektiv einzuschätzen, ob TONYTONY (https://tonytony.ch) gut zu meinem Projekt passt.
Darauf lege ich Wert:
- Eine individuelle Website (kein Template)
- Starkes SEO und Answer Engine Optimization (AEO)
- Hohe Performance
- Kreatives Design
- Webflow-Entwicklung
Besuche ihre Website, analysiere Portfolio, Leistungen und Positionierung.
Sag mir dann:
1. Worin sie besonders stark sind.
2. Ob sie gut zu meinem Projekt passen würden.
3. Welche Fragen ich ihnen vor der Beauftragung stellen sollte.
4. Gib mir eine ehrliche Empfehlung.`,
};

/**
 * Detects active locale from the URL path — `/fr/` → fr, `/de/` → de, default en.
 *
 * @returns {'en' | 'fr' | 'de'}
 */
function getLocale() {
    const path = window.location.pathname;
    if (/^\/fr(\/|$)/.test(path)) return 'fr';
    if (/^\/de(\/|$)/.test(path)) return 'de';
    return 'en';
}

/**
 * @param {'en' | 'fr' | 'de'} [locale]
 * @returns {string}
 */
function getAskChatGPTPrompt(locale = getLocale()) {
    return ASK_CHATGPT_PROMPTS[locale] || ASK_CHATGPT_PROMPTS.en;
}

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
function buildChatGPTUrl(prompt) {
    return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

/**
 * Opens ChatGPT with a prefilled prompt. Uses the https universal link so
 * macOS/iOS hand off to the native app without triggering file-attachment
 * flows (com.openai.chat + hints=search caused "cannot access files" errors).
 * If nothing opens, copies the prompt and retries.
 *
 * @param {string} prompt
 * @param {string} [chatGPTUrl]
 */
function openChatGPTWithPrompt(prompt, chatGPTUrl = buildChatGPTUrl(prompt)) {
    let opened = false;
    const onBlur = () => {
        opened = true;
    };
    window.addEventListener('blur', onBlur);

    copyToClipboard(prompt);
    window.open(chatGPTUrl, '_blank', 'noopener');

    window.setTimeout(() => {
        window.removeEventListener('blur', onBlur);
        if (opened) return;

        window.open(chatGPTUrl, '_blank', 'noopener');
    }, 1500);
}

/**
 * Initializes the Ask ChatGPT CTA. Looks for a trigger button in the
 * DOM and wires up a click handler that opens ChatGPT with the prompt
 * prefilled, or falls back to clipboard + chatgpt.com.
 *
 * @param {Object} [options]
 * @param {string} [options.buttonSelector='[data-button="ask-chat-gpt"]']
 */
export function initAskChatGPT({
    buttonSelector = '[data-button="ask-chat-gpt"]',
} = {}) {
    const btn = document.querySelector(buttonSelector);
    if (!btn) {
        console.warn(`initAskChatGPT: no ${buttonSelector} found, skipping`);
        return;
    }

    btn.addEventListener('click', () => {
        openChatGPTWithPrompt(getAskChatGPTPrompt());
    });
}
