import { setDoJumpCallback, doJump } from "client/flappy_bird";
import "components/the-game/static/sounds/sfx_wing.ogg";
import startGame from "../services/start_game"

if ("ontouchstart" in window) $(document).on("touchstart", screenClick);
else $(document).on("mousedown", screenClick);

// Permitindo os pulos pela barra de espaço
$(document).keydown(function handleOnScreenClick(e) {
  // usando a barra de espaço
  if (e.keyCode == 32) {
    // pode usar o space para sair da página de replay e começar novamente
    if (currentstate == states.ScoreScreen) $("#replay").click();
    else screenClick();
  }
});

function screenClick() {
  if (currentstate == states.GameScreen) {
    const playerId = $("[name=player_id]").attr("id");
    doJump(playerId);
  } else if (currentstate == states.SplashScreen) {
    startGame();
  }
}

//Callbacks
function handleDoJump(data) {
  $(`#${data.player_id}-player`)
    .get(0)
    .self.doJump();
}

setDoJumpCallback(handleDoJump);