import "javascripts/fb-jquery.transit.min"
import * as Buzz from "buzz/dist/buzz.min"
import setBigScore from "./set_big_score"
import setHighScore from "./set_high_score"
import setSmallScore from "./set_small_score"
import setMedal from "./set_medal"
import sfxSwooshing from "../components/the-game/static/sounds/sfx_swooshing.ogg"

const soundSwoosh = new Buzz.sound(sfxSwooshing)
// Função para setar o cookie por nome, valor e tempo para expirar
function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toGMTString()}`
  document.cookie = `${cname}=${cvalue}; ${expires}`
}

// Função para mostrar o s
export default function showScore() {
  // Mostra o quadro do score
  $("#scoreboard").css("display", "block")

  // Remove o big score da tela
  setBigScore(true)

  // Se o score obtido for maior que o maior score já obtido
  if (score > highscore) {
    // Salva o score
    highscore = score
    // Salva no cookie
    setCookie("highscore", highscore, 999)
  }

  // Muda o quadro de score
  setSmallScore()
  setHighScore()
  const wonmedal = setMedal()

  // som do SWOOSH!
  soundSwoosh.stop()
  soundSwoosh.play()

  // Mostra o quadro de score
  $("#scoreboard").css({ y: "40px", opacity: 0 }) // Move o quadro de score para baixo
  $("#replay").css({ y: "40px", opacity: 0 })
  $("#scoreboard").transition({ y: "0px", opacity: 1 }, 600, "ease", () => {
    // Quando a animação terminar começa o som de SWOOSH!
    soundSwoosh.stop()
    soundSwoosh.play()
    $("#replay").transition({ y: "0px", opacity: 1 }, 600, "ease")

    // também anima a medalha para aparecer no quadro de score
    if (wonmedal) {
      $("#medal").css({ scale: 2, opacity: 0 })
      $("#medal").transition({ opacity: 1, scale: 1 }, 1200, "ease")
    }
  })

  // deixa o botão de replay com clique
  replayclickable = true
}
