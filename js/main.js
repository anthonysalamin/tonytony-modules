/**
 * TONYTONY | main modules
 * @build 22.09.25 @updated 16:39 PHT
 */

console.log(
    "%c🦄 Deploying main modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

import { initMixItUp } from 'https://tonytony-modules.netlify.app/js/initMixItUp.js?v=1.0.0';
import { initLenis } from 'https://tonytony-modules.netlify.app/js/initLenis.js?v=1.0.0';

// Initialize core functionality
document.addEventListener("DOMContentLoaded", () => {
    const lenis = initLenis();
    initMixItUp();

    // Font-dependent animations (wait for fonts to load)
    /*
    document.fonts.ready.then(() => {
        initRevealTextClaim();
        console.log(`✅ Initialized all font-dependent modules`);
    });
    */

    console.log(`✅ Initialized all DOM-dependent modules`);
});

// Initialize smooth scrolling after full page load
/*
window.addEventListener("load", () => {
    new InitSmoothScrollManager();
    console.log(`✅ Initialized all load-dependent modules`);
});
*/