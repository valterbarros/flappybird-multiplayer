/* eslint global-require: 0 */
/* eslint import/first: 0 */

import showSplash from "../services/show_splash_screen"
import * as buzz from "buzz/dist/buzz.min"
import "javascripts/fb-jquery.transit.min"

const soundSwoosh = new buzz.sound(
  require("../components/the-game/static/sounds/sfx_swooshing.ogg")
)

$("#replay").click(() => {
  // Podemos deixar a ação de replay com clique também
  if (!replayclickable) return
  replayclickable = false
  // SWOOSH!
  soundSwoosh.stop()
  soundSwoosh.play()

  // Fade para o quadro de score sumir
  $("#scoreboard").transition(
    { y: "-40px", opacity: 0 },
    1000,
    "ease",
    () => {
      // Esconde o quadro de score
      $("#scoreboard").css("display", "none")

      // começa o game over e mostra a splash screen
      showSplash()
    }
  )
})
