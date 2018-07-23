/* eslint prefer-arrow-callback: 0 */
/* eslint global-require: 0 */

import "javascripts/fb-jquery.transit.min"
import * as buzz from "buzz/dist/buzz.min"

const soundSwoosh = new buzz.sound(
  require("../components/the-game/static/sounds/sfx_swooshing.ogg")
)

export default function showSplash() {
  // variavel para armazenar o estado do jogo e tratar posteriormente os eventos
  currentstate = states.SplashScreen

  // resetar as posições do player para o novo jogo
  $(".js-flappy-player").css({ y: 0, x: 0 })
  
  $(".js-flappy-player").each(function flappyBirdReset(){
    // setar os valores iniciais
    this.self.velocity = 0
    this.self.position = 180
    this.self.updatePlayer()
  })

  // resetar sons
  soundSwoosh.stop();
  soundSwoosh.play();

  // limpar todos os canos para iniciar o novo jogo
  $(".pipe").remove()
  pipes = []

  // começar todas as animações dos sprites novamente
  $(".animated").css("animation-play-state", "running")
  $(".animated").css("-webkit-animation-play-state", "running")

  // fade para a splash screen aparecer
  $("#splash").transition({ opacity: 1 }, 2000, "ease")
}
