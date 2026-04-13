/**
 * TONYTONY | main
 * Bootstraps feature modules on DOM ready, then font-dependent modules after fonts load.
 *
 * @build 13.04.26
 * @updated 13.04.26 PHT
 * @author TONYTONY Sàrl
 */

console.log(
    "%c🦄 Deploying main modules",
    "color: white; background: purple; padding: 2px 6px; border-radius: 3px;",
);

// ── CDN Imports ──────────────────────────────────────────────────────────────

import { initHideLoaderOnLoad } from "https://cdn.tonytony.ch/js/initHideLoaderOnLoad.js?v=1.0.0";
import { initPageTransitions } from "https://cdn.tonytony.ch/js/initPageTransitions.js?v=1.0.0";
// import { initLanguageRedirect } from 'https://cdn.tonytony.ch/js/initLanguageRedirect.js?v=1.0.0';
import { InitSmoothScrollManager } from "https://cdn.tonytony.ch/js/InitSmoothScrollManager.js?v=1.0.0";
import { initNavigation } from "https://cdn.tonytony.ch/js/initNavigation.js?v=1.0.0";
import { initNavBarDisplay } from "https://cdn.tonytony.ch/js/initNavBarDisplay.js?v=1.0.0";
import { initLogoTyped } from "https://cdn.tonytony.ch/js/initLogoTyped.js?v=1.0.0";
import { initVideoHeader } from "https://cdn.tonytony.ch/js/initVideoHeader.js?v=1.0.0";
import { initMarqueeDualHorizontal } from "https://cdn.tonytony.ch/js/initMarqueeDualHorizontal.js?v=1.0.0";
import { initMarqueeDualVertical } from "https://cdn.tonytony.ch/js/initMarqueeDualVertical.js?v=1.0.0";
import { initMixItUp } from "https://cdn.tonytony.ch/js/initMixItUp.js?v=1.0.0";
import { initFAQModule } from "https://cdn.tonytony.ch/js/initFAQModule.js?v=1.0.0";
import { initDrawCheck } from "https://cdn.tonytony.ch/js/initDrawCheck.js?v=1.0.0";
import { initRevealTextClaim } from "https://cdn.tonytony.ch/js/initRevealTextClaim.js?v=1.0.0";
import { initScrubOpacityIntoView } from "https://cdn.tonytony.ch/js/initScrubOpacityIntoView.js?v=1.0.0";
import { initScrubScaleIntoView } from "https://cdn.tonytony.ch/js/initScrubScaleIntoView.js?v=1.0.0";
import { initScrubUnblurIntoView } from "https://cdn.tonytony.ch/js/initScrubUnblurIntoView.js?v=1.0.0";
import { initCustomCursor } from "https://cdn.tonytony.ch/js/initCustomCursor.js?v=1.0.0";
import { injectCurrentYear } from "https://cdn.tonytony.ch/js/injectCurrentYear.js?v=1.0.0";
import { initMarqueeClients } from "https://cdn.tonytony.ch/js/initMarqueeClients.js?v=1.0.0";
import { initFathomTrackEvents } from "https://cdn.tonytony.ch/js/initFathomTrackEvents.js?v=1.0.0";
import { initMwg011 } from "https://cdn.tonytony.ch/js/initMWG011.js?v=1.0.0";
import { initGraphicSVG } from "https://cdn.tonytony.ch/js/initGraphicSVG.js?v=1.0.0";
import { initMuxPlayback } from "https://cdn.tonytony.ch/js/initMuxPlayback.js?v=1.0.0";
import { initSwitchTheme } from "https://cdn.tonytony.ch/js/initSwitchTheme.js?v=1.0.0";
import { initSwitchThemeCaseStudies } from "https://cdn.tonytony.ch/js/initSwitchThemeCaseStudies.js?v=1.0.0";
import { initSVGInjection } from "https://cdn.tonytony.ch/js/initSVGInjection.js?v=1.0.0";
import { initContactForm } from "https://cdn.tonytony.ch/js/initContactForm.js?v=1.0.0";

// ── Runner ───────────────────────────────────────────────────────────────────

/**
 * Safely runs a module init, logging errors without breaking the chain.
 */
function run(label, fn) {
    try {
        fn();
    } catch (err) {
        console.error(`❌ ${label} failed:`, err);
    }
}

// ── Bootstrap ────────────────────────────────────────────────────────────────

async function initApp() {

    // =========================
    // 1. CRITICAL / UI LAYER
    // =========================

    run("HideLoaderOnLoad", initHideLoaderOnLoad);
    run("SmoothScrollManager", () => new InitSmoothScrollManager());
    run("NavBarDisplay", initNavBarDisplay);
    run("Navigation", initNavigation);
    run("VideoHeader", initVideoHeader);
    run("LogoTyped", initLogoTyped);

    // =========================
    // 2. DOM MODULES
    // =========================

    // marquees
    run("MarqueeDualHorizontal", initMarqueeDualHorizontal);
    run("MarqueeDualVertical", initMarqueeDualVertical);
    run("MarqueeClients", initMarqueeClients);

    // layout & interaction
    run("MixItUp", initMixItUp);
    run("PageTransitions", initPageTransitions);
    run("FAQModule", initFAQModule);
    run("DrawCheck", initDrawCheck);

    // themes
    run("SwitchTheme", initSwitchTheme);
    run("SwitchThemeCaseStudies", initSwitchThemeCaseStudies);
    run("SVGInjection", initSVGInjection);

    // video
    run("MuxPlayback", initMuxPlayback);

    // forms
    run("ContactForm", initContactForm);

    // scroll-driven reveals
    run("ScrubOpacityIntoView", initScrubOpacityIntoView);
    run("ScrubScaleIntoView", initScrubScaleIntoView);
    run("ScrubUnblurIntoView", initScrubUnblurIntoView);

    // utilities
    run("CustomCursor", initCustomCursor);
    run("InjectCurrentYear", injectCurrentYear);
    run("GraphicSVG", initGraphicSVG);
    run("MWG011", initMwg011);

    // analytics
    run("FathomTrackEvents", initFathomTrackEvents);

    console.log("✅ DOM modules initialized");

    // =========================
    // 3. FONT-DEPENDENT LAYER
    // =========================

    await document.fonts.ready;

    run("RevealTextClaim", initRevealTextClaim);

    console.log("✅ Font-dependent modules initialized");

    // =========================
    // 4. DONE
    // =========================
    console.log("🚀 App fully initialized");
}

document.addEventListener("DOMContentLoaded", initApp);
