import showSplash from "../services/show_score"
import * as buzz from "buzz/dist/buzz.min";
import "javascripts/fb-jquery.transit.min";
var soundSwoosh = new buzz.sound(require("../components/the-game/static/sounds/sfx_swooshing.ogg"));

$("#replay").click(function() {
  // Podemos deixar a ação de replay com clique também
  if (!replayclickable) return;
  else replayclickable = false;
  //SWOOSH!
  soundSwoosh.stop();
  soundSwoosh.play();

  // Fade para o quadro de score sumir
  $("#scoreboard").transition(
    { y: "-40px", opacity: 0 },
    1000,
    "ease",
    function() {
      // Esconde o quadro de score
      $("#scoreboard").css("display", "none");

      // começa o game over e mostra a splash screen
      showSplash();
    }
  );
});