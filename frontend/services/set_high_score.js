export default function setHighScore() {
  // Seta o maior score já obtido pelo jogador e mostra na tela
  var elemscore = $("#highscore");
  console.log(elemscore)
  elemscore.empty();

  var digits = highscore.toString().split("");
  for (var i = 0; i < digits.length; i++)
    var src = `${require("../components/the-game/static/font_small_" + digits[i] + ".png")}`;
  elemscore.append(`<img src=${src} alt=''>`);
}