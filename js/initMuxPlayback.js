/**
 * TONYTONY | initMuxPlayback
 * Parses data-json on mux-player elements to inject Playback_ID, poster URL, ratio, and description.
 * @build 04.04.26
 * @updated 17:10 CET
 */

export function initMuxPlayback() {
  const players = document.querySelectorAll("mux-player[data-json]");

  players.forEach((player) => {
    try {
      const data = JSON.parse(player.getAttribute("data-json"));
      const id = data?.Playback_ID;

      if (!id) return;

      const ratio = data?.ratio || "16/10";

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
    } catch (e) {
      console.warn("initMuxPlayback: invalid JSON on element", player, e);
    }
  });
}
