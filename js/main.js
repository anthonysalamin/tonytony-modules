/**
 * TONYTONY | main modules
 * @build 22.09.25 @updated 16:39 PHT
 */

console.log(
    "%c🦄 Deploying main modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

import { initLanguageRedirect } from 'https://tonytony-modules.netlify.app/js/initLanguageRedirect.js?v=1.0.0';
import { InitSmoothScrollManager } from 'https://tonytony-modules.netlify.app/js/InitSmoothScrollManager.js?v=1.0.0';
import { initNavigation } from 'https://tonytony-modules.netlify.app/js/initNavigation.js?v=1.0.0'
import { initMixItUp } from 'https://tonytony-modules.netlify.app/js/initMixItUp.js?v=1.0.0';
import { initRevealTextClaim } from 'https://tonytony-modules.netlify.app/js/initRevealTextClaim.js?v=1.0.0';
import { initVerticalMarquees } from 'https://tonytony-modules.netlify.app/js/initVerticalMarquees.js?v=1.0.0';
import { initFAQModule } from 'https://tonytony-modules.netlify.app/js/initFAQModule.js?v=1.0.0';
import { initDrawCheck } from 'https://tonytony-modules.netlify.app/js/initDrawCheck.js?v=1.0.0';
import { initScrollProgress } from 'https://tonytony-modules.netlify.app/js/initScrollProgress.js?v=1.0.0';

// IIFEs
initLanguageRedirect();

// Initialize core functionality
document.addEventListener("DOMContentLoaded", () => {

    // on load
    initNavigation();
    initMixItUp();
    initVerticalMarquees();
    initFAQModule();
    initDrawCheck();
    initScrollProgress({
        position: "left",
        breakpoint: 768,
        hideAtPercentage: 0.9
    });

    // font-dependent
    document.fonts.ready.then(() => {
        initRevealTextClaim();
        console.log(`✅ Initialized all font-dependent modules`);
    });

    console.log(`✅ Initialized all DOM-dependent modules`);
});

// Initialize smooth scrolling after full page load
window.addEventListener("load", () => {
    new InitSmoothScrollManager();
    console.log(`✅ Initialized all load-dependent modules`);
});