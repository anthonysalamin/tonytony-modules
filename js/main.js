/**
 * TONYTONY | main modules
 * @build 22.09.25 @updated 16:39 PHT
 */

console.log(
    "%c🦄 Deploying main modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

import { initLanguageRedirect } from 'https://cdn.tonytony.ch/js/initLanguageRedirect.js?v=1.0.0';
import { InitSmoothScrollManager } from 'https://cdn.tonytony.ch/js/InitSmoothScrollManager.js?v=1.0.0';
import { initNavigation } from 'https://cdn.tonytony.ch/js/initNavigation.js?v=1.0.0'

import { initMixItUp } from 'https://cdn.tonytony.ch/js/initMixItUp.js?v=1.0.0';
import { initVerticalMarquees } from 'https://cdn.tonytony.ch/js/initVerticalMarquees.js?v=1.0.0';
import { initFAQModule } from 'https://cdn.tonytony.ch/js/initFAQModule.js?v=1.0.0';
import { initDrawCheck } from 'https://cdn.tonytony.ch/js/initDrawCheck.js?v=1.0.0';
import { InitUdeslyRedirect } from 'https://cdn.tonytony.ch/js/InitUdeslyRedirect.js?v=1.0.0';

import { initRevealTextClaim } from 'https://cdn.tonytony.ch/js/initRevealTextClaim.js?v=1.0.0';

import { initScrubOpacityIntoView } from 'https://cdn.tonytony.ch/js/initScrubOpacityIntoView.js?v=1.0.0';
import { initScrubScaleIntoView } from 'https://cdn.tonytony.ch/js/initScrubScaleIntoView.js?v=1.0.0';
import { initScrubUnblurIntoView } from 'https://cdn.tonytony.ch/js/initScrubUnblurIntoView.js?v=1.0.0';

import { initCustomCursor } from 'https://cdn.tonytony.ch/js/initCustomCursor.js?v=1.0.0';
import { initScrollProgress } from 'https://cdn.tonytony.ch/js/initScrollProgress.js?v=1.0.0';
import { injectCurrentYear } from 'https://cdn.tonytony.ch/js/injectCurrentYear.js?v=1.0.0';

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
    initUdeslyRedirect();

    // scrub reveal
    initScrubOpacityIntoView();
    initScrubScaleIntoView();
    initScrubUnblurIntoView();

    initScrollProgress({
        position: "left",
        breakpoint: 768,
        hideAtPercentage: 0.9
    });

    initCustomCursor({
        BREAKPOINT: 768
    });

    injectCurrentYear();

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