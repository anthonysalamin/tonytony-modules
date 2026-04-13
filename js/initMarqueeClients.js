/**
 * TONYTONY | initMarqueeClients
 * Runs an infinite GSAP marquee on the given root with drag inertia, cloned loop segments, and press-tilt cards.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initMarqueeClients() {
  const root = document.querySelector('[data-mwg008="root"]');
  if (!root) return;

  function boot() {
    if (window.gsap && window.Observer) {
      initEffect();
    } else {
      setTimeout(boot, 50);
    }
  }

  boot();

  function initEffect() {
    let total = 0, xTo, itemValues = [];

    const content = root.querySelector('[data-mwg008="container"]');
    const items = content.querySelectorAll(":scope > *");
    const cards = root.querySelectorAll('[data-mwg008="card"]');
    const originalCardsLength = cards.length;

    // initial css states
    content.style.cursor = "grab";

    // Clone all collection items to create seamless loop
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      content.appendChild(clone);
    });

    // Recalculate after cloning
    const allCards = root.querySelectorAll('[data-mwg008="card"]');
    const singleSetWidth = content.scrollWidth / 2;
    const wrap = gsap.utils.wrap(-singleSetWidth, 0);

    xTo = gsap.quickTo(content, "x", {
      duration: 0.5,
      modifiers: {
        x: gsap.utils.unitize(wrap),
      },
      ease: "power3",
    });

    for (let i = 0; i < originalCardsLength; i++) {
      itemValues.push((Math.random() - 0.5) * 20);
    }

    const tl = gsap.timeline({ paused: true });
    tl.to(allCards, {
      rotate: (index) => itemValues[index % originalCardsLength],
      xPercent: (index) => itemValues[index % originalCardsLength],
      yPercent: (index) => itemValues[index % originalCardsLength],
      scale: 0.95,
      duration: 0.5,
      ease: "back.inOut(3)",
    });

    const gsapObs = Observer.create({
      target: content,
      type: "pointer,touch",
      onPress: () => {
        content.style.cursor = "grabbing";
        tl.play();
      },
      onDrag: (self) => {
        total += self.deltaX;
        xTo(total);
      },
      onRelease: () => {
        content.style.cursor = "grab";
        tl.reverse();
      },
      onStop: () => tl.reverse(),
    });

    gsap.ticker.add(tick);

    function tick(time, deltaTime) {
      total -= deltaTime / 10;
      xTo(total);
    }

    const observer = new MutationObserver((mutations) => {
      const isRootRemoved = mutations.some(
        (mutation) =>
          mutation.type === "childList" &&
          Array.from(mutation.removedNodes).includes(root)
      );
      if (isRootRemoved) {
        gsap.ticker.remove(tick);
        gsapObs.kill();
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}
