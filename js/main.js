/**
 * TONYTONY | main modules
 * @build 22.09.25 @updated 16:39 PHT
 */

console.log(
    "%c🦄 Deploying main modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

import { initHideLoaderOnLoad } from 'https://cdn.tonytony.ch/js/initHideLoaderOnLoad.js?v=1.0.0';
import { initLanguageRedirect } from 'https://cdn.tonytony.ch/js/initLanguageRedirect.js?v=1.0.0';
import { InitSmoothScrollManager } from 'https://cdn.tonytony.ch/js/InitSmoothScrollManager.js?v=1.0.0';
import { initNavigation } from 'https://cdn.tonytony.ch/js/initNavigation.js?v=1.0.0';
import { initNavBarDisplay } from 'https://cdn.tonytony.ch/js/initNavBarDisplay.js?v=1.0.0';
// import { initVideoState } from 'https://cdn.tonytony.ch/js/initVideoState.js?v=1.0.0';
import { initMarqueeDualHorizontal } from 'https://cdn.tonytony.ch/js/initMarqueeDualHorizontal.js?v=1.0.0';
import { initMarqueeDualVertical } from 'https://cdn.tonytony.ch/js/initMarqueeDualVertical.js?v=1.0.0';

import { initMixItUp } from 'https://cdn.tonytony.ch/js/initMixItUp.js?v=1.0.0';
import { initFAQModule } from 'https://cdn.tonytony.ch/js/initFAQModule.js?v=1.0.0';
import { initDrawCheck } from 'https://cdn.tonytony.ch/js/initDrawCheck.js?v=1.0.0';
import { initUdeslyRedirect } from 'https://cdn.tonytony.ch/js/initUdeslyRedirect.js?v=1.0.0';

import { initRevealTextClaim } from 'https://cdn.tonytony.ch/js/initRevealTextClaim.js?v=1.0.0';

import { initScrubOpacityIntoView } from 'https://cdn.tonytony.ch/js/initScrubOpacityIntoView.js?v=1.0.0';
import { initScrubScaleIntoView } from 'https://cdn.tonytony.ch/js/initScrubScaleIntoView.js?v=1.0.0';
import { initScrubUnblurIntoView } from 'https://cdn.tonytony.ch/js/initScrubUnblurIntoView.js?v=1.0.0';

import { initCustomCursor } from 'https://cdn.tonytony.ch/js/initCustomCursor.js?v=1.0.0';
import { initScrollProgress } from 'https://cdn.tonytony.ch/js/initScrollProgress.js?v=1.0.0';
import { injectCurrentYear } from 'https://cdn.tonytony.ch/js/injectCurrentYear.js?v=1.0.0';
import { initMarqueeClients } from 'https://cdn.tonytony.ch/js/initMarqueeClients.js?v=1.0.0';
import { initFathomTrackEvents } from 'https://cdn.tonytony.ch/js/initFathomTrackEvents.js?v=1.0.0';
import { initMwg011 } from 'https://cdn.tonytony.ch/js/initMWG011.js?v=1.0.0';
import { initGraphicSVG } from 'https://cdn.tonytony.ch/js/initGraphicSVG.js?v=1.0.0';
import { initMuxPlayback } from 'https://cdn.tonytony.ch/js/initMuxPlayback.js?v=1.0.0';

// IIFEs
initLanguageRedirect();

// on DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    initHideLoaderOnLoad();

    // smooth scroll
    new InitSmoothScrollManager();

    // core
    initNavigation();
    initNavBarDisplay();
    // initVideoState();
    initMarqueeDualHorizontal();
    initMarqueeDualVertical();

    initMixItUp();
    initFAQModule();
    initDrawCheck();
    initMuxPlayback();
    
    // marquee clients
    const marqueeRoot = document.querySelector('[data-mwg008="root"]');
    if (marqueeRoot) initMarqueeClients(marqueeRoot);

    // forms
    initUdeslyRedirect();

    // scrub reveal
    initScrubOpacityIntoView();
    initScrubScaleIntoView();
    initScrubUnblurIntoView();

    // fathom track event
    initFathomTrackEvents();

    initScrollProgress({
        position: "left",
        breakpoint: 768,
        hideAtPercentage: 0.9
    });

    initCustomCursor();
    injectCurrentYear();
    initGraphicSVG();

    initMwg011();

    // font-dependent
    document.fonts.ready.then(() => {
        initRevealTextClaim();
        console.log(`✅ Initialized all font-dependent modules`);
    });

    console.log(`✅ Initialized all DOM-dependent modules`);
});
