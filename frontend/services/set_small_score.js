export default function setSmallScore() {
  // Seta o score obtido pelo jogador com a imagem pequena
  var elemscore = $("#currentscore");
  elemscore.empty();

  var digits = score.toString().split("");
  for (var i = 0; i < digits.length; i++)
    var src = `${require("../components/the-game/static/font_small_" + digits[i] + ".png")}`;
  elemscore.append(`<img src=${src} alt=''>`);
}