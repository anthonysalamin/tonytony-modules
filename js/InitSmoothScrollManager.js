/**
 * UTILITY | InitSmoothScrollManager
 * @build 11.09.25 @updated 21:42 PHT
 * Sets up and manages smooth scrolling with Lenis, keeps ScrollTrigger in sync, and refreshes on content or resize changes.
 */

export class InitSmoothScrollManager {
    constructor() {
        this.lenis = null;
        this.isAnimating = false;
        this.initialized = false;
        this.initWithDependencyCheck();
    }

    initWithDependencyCheck() {
        // Check if dependencies are available
        if (this.checkDependencies()) {
            this.init();
            return;
        }

        // If dependencies not available, retry with exponential backoff
        let attempts = 0;
        const maxAttempts = 10;
        const retryInterval = setInterval(() => {
            attempts++;
            if (this.checkDependencies()) {
                clearInterval(retryInterval);
                this.init();
                // console.log(`✅ initialized InitSmoothScrollManager after ${attempts * 50}ms`);
            } else if (attempts >= maxAttempts) {
                clearInterval(retryInterval);
                console.error("Failed to initialize InitSmoothScrollManager: Missing dependencies (Lenis or ScrollTrigger)");
            }
        }, 50);
    }

    checkDependencies() {
        if (this.initialized) return true; // already initialized
        return typeof Lenis !== "undefined" && typeof ScrollTrigger !== "undefined";
    }

    init() {
        if (this.initialized) {
            console.warn("InitSmoothScrollManager already initialized");
            return;
        }

        this.lenis = new Lenis({
            duration: 1.2,
            smoothTouch: false,
            infinite: false,
            wheelMultiplier: 0.8, // reduce the jump size per wheel notch
            touchMultiplier: 1.5, // keep touch/trackpad responsive
        });

        window.pageScrollManager = this;
        window.lenis__pageScroll = this.lenis;

        /*
        console.log(
            window.lenis__pageScroll
                ? "✅ Lenis pageScroll available"
                : "❌ Lenis pageScroll error"
        );
        */

        this.startAnimation();
        this.observeContentChanges();
        this.setupScrollTrigger();
        this.initialized = true;
    }

    startAnimation() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            gsap.ticker.add((time) => {
                this.lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }

    setupScrollTrigger() {
        this.lenis.on("scroll", ScrollTrigger.update);
    }

    observeContentChanges() {
        const resizeObserver = new ResizeObserver(() => {
            this.updateScrollHeight();
        });

        resizeObserver.observe(document.body);

        const elfsightApp = document.querySelector(".elfsight-app");
        if (elfsightApp) {
            resizeObserver.observe(elfsightApp);
        }

        document.addEventListener("click", (event) => {
            const isLoadMoreButton =
                event.target.matches(".eapps-linkedin-feed-load-more-button") ||
                event.target.closest(".eapps-linkedin-feed-load-more");

            if (isLoadMoreButton) {
                setTimeout(() => this.updateScrollHeight(), 500);
            }
        });
    }

    updateScrollHeight() {
        if (this.lenis) {
            this.lenis.resize();
            ScrollTrigger.refresh();
            // console.log("✅ lenis + ScrollTrigger refreshed");
        }
    }
}