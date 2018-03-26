import * as buzz from "components/the-game/fb-buzz.min.js";
import { doJump, setDoJumpCallback } from 'client/flappy_bird'
import "components/the-game/static/sounds/sfx_wing.ogg";
import { startGame } from "components/the-game/fb-main"

const soundJump = new buzz.sound(require("components/the-game/static/sounds/sfx_wing.ogg"));

function playerJump() {
  window.velocity = window.jump;

  soundJump.stop();
  soundJump.play();
}

setDoJumpCallback(playerJump);

if ("ontouchstart" in window) $(document).on("touchstart", screenClick);
else $(document).on("mousedown", screenClick);

function screenClick() {
  if (window.currentstate == window.states.GameScreen) {
    doJump();
  } else if (window.currentstate == window.states.SplashScreen) {
    startGame();
  }
}
