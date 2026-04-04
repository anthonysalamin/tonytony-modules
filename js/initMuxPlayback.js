/**
 * TONYTONY | initMuxPlayback
 * Parses data-json on mux-player elements to inject Playback_ID into playback-id attribute and poster URL.
 * @build 04.04.26
 * @updated 16:35 CET
 */

export function initMuxPlayback() {
  const players = document.querySelectorAll("mux-player[data-json]");

  players.forEach((player) => {
    try {
      const data = JSON.parse(player.getAttribute("data-json"));
      const id = data?.Playback_ID;

      if (!id) return;

      player.setAttribute("playback-id", id);
      player.setAttribute(
        "poster",
        `https://image.mux.com/${id}/thumbnail.png?width=50&height=28&time=30`
      );

      const description = data?.description;
      if (description) {
        const legend = player.nextElementSibling;
        if (legend?.hasAttribute("data-mux")) {
          legend.textContent = description;
        }
      }
    } catch (e) {
      console.warn("initMuxPlayback: invalid JSON on element", player, e);
    }
  });
}