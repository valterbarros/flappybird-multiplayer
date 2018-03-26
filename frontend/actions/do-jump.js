import * as buzz from "components/the-game/fb-buzz.min.js";
import { doJump, setDoJumpCallback } from 'client/flappy_bird'
import "components/the-game/static/sounds/sfx_wing.ogg";
import { startGame, setVelocity, jump, currentstate, states } from "components/the-game/fb-main"

const soundJump = new buzz.sound(require("components/the-game/static/sounds/sfx_wing.ogg"));

function playerJump() {
  setVelocity(jump)

  soundJump.stop();
  soundJump.play();
}

setDoJumpCallback(playerJump);

if ("ontouchstart" in window) $(document).on("touchstart", screenClick);
else $(document).on("mousedown", screenClick);

// Permitindo os pulos pela barra de espaço
$(document).keydown(function(e) {
  // usando a barra de espaço
  if (e.keyCode == 32) {
    // pode usar o space para sair da página de replay e começar novamente
    if (currentstate == states.ScoreScreen) $("#replay").click();
    else screenClick();
  }
});

function screenClick() {
  if (currentstate == states.GameScreen) {
    doJump();
  } else if (currentstate == states.SplashScreen) {
    startGame();
  }
}
