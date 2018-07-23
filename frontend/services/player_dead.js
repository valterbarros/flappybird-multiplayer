import * as buzz from "buzz/dist/buzz.min"
import soundHitOgg from "../components/the-game/static/sounds/sfx_hit.ogg"
import sfxDieOgg from "../components/the-game/static/sounds/sfx_die.ogg"
import isIncompatible from "../utils/is_incompatible"
import showScore from "./show_score"

const soundHit = new buzz.sound(soundHitOgg)
const soundDie = new buzz.sound(sfxDieOgg)

// Função para quando o player morrer
export default function playerDead(player) {
  // Pausando todas as animações
  $(".animated").css("animation-play-state", "paused")
  $(".animated").css("-webkit-animation-play-state", "paused")

  // Dropar o passarinho do footer
  const playerbottom = $(player).position().top + $(player).width() // Usamos porque ele irá rotacionar 90º
  const floor = $("#flyarea-game").height()
  const movey = Math.max(0, floor - playerbottom)
  $(player).transition({ y: `${movey}px`, rotate: 90 }, 1000, "easeInOutCubic")

  // Este é o tempo para mudar os estados. Vamos considerar a scorescreen para desabilitar o click/jump
  currentstate = states.ScoreScreen

  // Destroi todos os games loops
  clearInterval(loopGameloop)
  clearInterval(loopPipeloop)
  loopGameloop = null
  loopPipeloop = null

  // Mobile browsers não suportam buzz bindOnce event
  if (isIncompatible.any()) {
    // Mostra o score
    showScore()
  } else {
    // Começa o hit sound e depois o som de morte e depois mostra o score
    soundHit.play().bindOnce("ended", () => {
      soundDie.play().bindOnce("ended", () => {
        showScore()
      })
    })
  }
}
