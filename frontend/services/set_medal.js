export default function setMedal() {
  var medal;
  var elemmedal = $("#medal");
  elemmedal.empty();

  if (score < 10)
    //signal that no medal has been won
    return false;

  if (score >= 10) medal = "bronze";
  if (score >= 20) medal = "silver";
  if (score >= 30) medal = "gold";
  if (score >= 40) medal = "platinum";

  var src = `${require("../components/the-game/static/medal_" + medal + ".png")}`;
  elemmedal.append(`<img src=${src} alt=${medal}>`);

  // sinal de que a medalha foi recebida
  return true;
}