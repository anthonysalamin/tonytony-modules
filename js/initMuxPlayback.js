/**
 * TONYTONY | initMuxPlayback
 * Hydrates each `mux-player[data-json]` from JSON and drives in-view autoplay with GSAP ScrollTrigger.
 *
 * @build 12.04.26
 * @updated 12.04.26 PHT
 * @author TONYTONY Sàrl
 */

export function initMuxPlayback() {
  const players = document.querySelectorAll("mux-player[data-json]");

  players.forEach((player) => {
    try {
      const data = JSON.parse(player.getAttribute("data-json"));
      const id = data?.Playback_ID;

      if (!id) return;

      const ratio = (data?.ratio || "16:10").replace(":", "/");

      player.setAttribute("min-resolution", "1080p");
      player.setAttribute("playback-id", id);
      player.setAttribute(
        "poster",
        `https://image.mux.com/${id}/thumbnail.png?width=50&height=28&time=30`
      );

      player.style.aspectRatio = ratio;

      if (data?.description) {
        const legend = player.closest(`[data-mux="embed"]`)?.nextElementSibling;
        if (legend?.getAttribute("data-mux") === "legend") {
          legend.textContent = data.description;
        }
      } else {
        const legend = player.closest(`[data-mux="embed"]`)?.nextElementSibling;
        if (legend?.getAttribute("data-mux") === "legend") {
          legend.remove();
        }
      }

      // ScrollTrigger autoplay
      const initAutoplay = () => {
        player.pause();

        ScrollTrigger.create({
          trigger: player,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => player.play(),
          onEnterBack: () => player.play(),
          onLeave: () => player.pause(),
          onLeaveBack: () => player.pause(),
        });
      };

      if (player.readyState >= 1) {
        initAutoplay();
      } else {
        player.addEventListener("loadedmetadata", initAutoplay, { once: true });
      }
    } catch (e) {
      console.warn("initMuxPlayback: invalid JSON on element", player, e);
    }
  });
}
