/**
 * TONYTONY | main modules
 * @build 22.09.25 @updated 16:39 PHT
 */

console.log(
    "%c🦄 Deploying header EN modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

import { initSublineAnimation } from 'https://tonytony-modules.netlify.app/js/header/en/initSublineAnimation.js?v=1.0.0';

// Initialize core functionality
document.addEventListener("DOMContentLoaded", () => {

    // on load
    initSublineAnimation();

    console.log(`✅ Initialized all DOM-dependent modules (header/en)`);
});