/**
 * TONYTONY | initMarkeeMWG008
 * Infinite marquee with GSAP-driven drag interaction, random card rotation on press, and seamless loop via cloning.
 * @build 02.02.26
 * @updated 10.03.26
 */

export function initMarkeeMWG008(root) {
  function boot() {
    if (window.gsap && window.Observer) {
      initEffect();
    } else {
      setTimeout(boot, 50);
    }
  }

  boot();

  function initEffect() {
    if (!root) return;

    let total = 0, xTo, itemValues = [];

    const content = root.querySelector('[data-mwg008="container"]');
    const items = content.querySelectorAll(":scope > *");
    const cards = root.querySelectorAll('[data-mwg008="card"]');
    const originalCardsLength = cards.length;

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
      onPress: () => tl.play(),
      onDrag: (self) => {
        total += self.deltaX;
        xTo(total);
      },
      onRelease: () => tl.reverse(),
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
