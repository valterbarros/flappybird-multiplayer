import "javascripts/fb-jquery.transit.min";
import setBigScore from "./set_big_score"
import setHighScore from "./set_high_score"
import setSmallScore from "./set_small_score"
import setMedal from "./set_medal"
import * as buzz from "buzz/dist/buzz.min";
var soundSwoosh = new buzz.sound(require("../components/the-game/static/sounds/sfx_swooshing.ogg"));

// Função para mostrar o score
export default function showScore() {
  // Mostra o quadro do score
  $("#scoreboard").css("display", "block");

  // Remove o big score da tela
  setBigScore(true);

  // Se o score obtido for maior que o maior score já obtido
  if (score > highscore) {
    // Salva o score
    highscore = score;
    // Salva no cookie
    setCookie("highscore", highscore, 999);
  }

  // Muda o quadro de score
  console.log('pray')
  setSmallScore();
  setHighScore();
  var wonmedal = setMedal();

  // som do SWOOSH!
  soundSwoosh.stop();
  soundSwoosh.play();

  // Mostra o quadro de score
  $("#scoreboard").css({ y: "40px", opacity: 0 }); // Move o quadro de score para biaxo
  $("#replay").css({ y: "40px", opacity: 0 });
  $("#scoreboard").transition(
    { y: "0px", opacity: 1 },
    600,
    "ease",
    function() {
      // Qaundo a animação terminar começa o som de SWOOSH!
      soundSwoosh.stop();
      soundSwoosh.play();
      $("#replay").transition({ y: "0px", opacity: 1 }, 600, "ease");

      // também animal a medalha para aparecer no quadro de score
      if (wonmedal) {
        $("#medal").css({ scale: 2, opacity: 0 });
        $("#medal").transition({ opacity: 1, scale: 1 }, 1200, "ease");
      }
    }
  );

  // deixa o botão de replay com clique
  replayclickable = true;
}