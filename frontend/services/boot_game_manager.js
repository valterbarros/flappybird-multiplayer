import showSplash from "./show_splash_screen"

$(document).ready(function bootGame() {
  if (window.location.search == "?debug") debugmode = true;
  if (window.location.search == "?easy") pipeheight = 200;

  // TODOimport capturar o highscore pelo cookie
  //var savedscore = getCookie("highscore");
  //if (savedscore != "") highscore = parseInt(savedscore);

  // Começar com a tela inicial
  showSplash();
});