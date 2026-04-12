/**
 * TONYTONY | main
 * Loads CDN module imports and initializes DOM-critical and font-dependent site behavior on DOMContentLoaded.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

console.log(
    "%c🦄 Deploying main modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

import { initHideLoaderOnLoad } from 'https://cdn.tonytony.ch/js/initHideLoaderOnLoad.js?v=1.0.0';
import { initPageTransitions } from 'https://cdn.tonytony.ch/js/initPageTransitions.js?v=1.0.0';
import { initLanguageRedirect } from 'https://cdn.tonytony.ch/js/initLanguageRedirect.js?v=1.0.0';
import { InitSmoothScrollManager } from 'https://cdn.tonytony.ch/js/InitSmoothScrollManager.js?v=1.0.0';
import { initNavigation } from 'https://cdn.tonytony.ch/js/initNavigation.js?v=1.0.0';
import { initNavBarDisplay } from 'https://cdn.tonytony.ch/js/initNavBarDisplay.js?v=1.0.0';
import { initLogoTyped } from 'https://cdn.tonytony.ch/js/initLogoTyped.js?v=1.0.0';
import { initVideoHeader } from 'https://cdn.tonytony.ch/js/initVideoHeader.js?v=1.0.0';
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
import { injectCurrentYear } from 'https://cdn.tonytony.ch/js/injectCurrentYear.js?v=1.0.0';
import { initMarqueeClients } from 'https://cdn.tonytony.ch/js/initMarqueeClients.js?v=1.0.0';
import { initFathomTrackEvents } from 'https://cdn.tonytony.ch/js/initFathomTrackEvents.js?v=1.0.0';
import { initMwg011 } from 'https://cdn.tonytony.ch/js/initMWG011.js?v=1.0.0';
import { initGraphicSVG } from 'https://cdn.tonytony.ch/js/initGraphicSVG.js?v=1.0.0';
import { initMuxPlayback } from 'https://cdn.tonytony.ch/js/initMuxPlayback.js?v=1.0.0';
import { initSwitchTheme } from 'https://cdn.tonytony.ch/js/initSwitchTheme.js?v=1.0.0';
import { initSwitchThemeCaseStudies } from 'https://cdn.tonytony.ch/js/initSwitchThemeCaseStudies.js?v=1.0.0';
import { initSVGInjection } from 'https://cdn.tonytony.ch/js/initSVGInjection.js?v=1.0.0';
import { initContactForm } from 'https://cdn.tonytony.ch/js/initContactForm.js?v=1.0.0';

// IIFEs
initLanguageRedirect();

// on DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    // critical
    initHideLoaderOnLoad();
    new InitSmoothScrollManager();
    initNavBarDisplay();
    initNavigation();
    initVideoHeader();
    initLogoTyped();

    // marquees
    initMarqueeDualHorizontal();
    initMarqueeDualVertical();

    initMixItUp();
    initPageTransitions();
    initFAQModule();
    initDrawCheck();

    // themes
    initSwitchTheme();
    initSwitchThemeCaseStudies();
    initSVGInjection();
    
    // video handling
    initMuxPlayback();

    // marquee clients
    const marqueeRoot = document.querySelector('[data-mwg008="root"]');
    if (marqueeRoot) initMarqueeClients(marqueeRoot);

    // forms
    initUdeslyRedirect(); // to kill on relaunch
    initContactForm();

    // scrub reveal
    initScrubOpacityIntoView();
    initScrubScaleIntoView();
    initScrubUnblurIntoView();

    initCustomCursor();
    injectCurrentYear();
    initGraphicSVG();
    initMwg011();

    initFathomTrackEvents();

    // font-dependent
    document.fonts.ready.then(() => {
        initRevealTextClaim();
        console.log(`✅ Initialized all font-dependent modules`);
    });

    console.log(`✅ Initialized all DOM-dependent modules`);
});
