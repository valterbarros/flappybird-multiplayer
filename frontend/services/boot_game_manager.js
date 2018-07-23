import showSplash from "./show_splash_screen"

// Função para capturar o cookie para mostrar o score posteriormente
// function getCookie(cname) {
//   var name = cname + "=";
//   var ca = document.cookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i].trim();
//     if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
//   }
//   return "";
// }

$(document).ready(() => {
  // TODOimport capturar o highscore pelo cookie
  // var savedscore = getCookie("highscore");
  // if (savedscore != "") highscore = parseInt(savedscore);

  // Começar com a tela inicial
  showSplash()
})
