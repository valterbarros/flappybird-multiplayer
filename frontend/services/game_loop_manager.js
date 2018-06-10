import gameLoop from "./game_loop"
import "javascripts/fb-jquery.transit.min";

(function startGame() {
  // variavel para armazenar o estado do jogo e tratar posteriormente os eventos
  currentstate = states.GameScreen;

  // fade para a splash screen sumir
  $("#splash").stop();
  $("#splash").transition({ opacity: 0 }, 500, "ease");

  // ir mostrando o score no topo do jogo
  //setBigScore();

  // começar os loops do jogo - aumentar o tempo e intervalo de canos
  var updaterate = 1000.0 / 60.0; // 60 fps
  loopGameloop = setInterval(gameLoop, updaterate);
  //loopPipeloop = setInterval(updatePipes, 1400);
})(gameLoop)