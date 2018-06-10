// Função para setar a pontuação e aparecer na tela as imagens grande de pontuação
export default function setBigScore(erase) {
  var elemscore = $("#bigscore");
  elemscore.empty();

  if (erase) return;

  var digits = score.toString().split("");
  for (var i = 0; i < digits.length; i++)
    var src = `${require("../components/the-game/static/font_big_" + digits[i] + ".png")}`;
  elemscore.append(`<img src=${src} alt=''>`);
}