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

// Função para quando o player morrer
function playerDead() {
  // Pausando todas as animações
  $(".animated").css("animation-play-state", "paused");
  $(".animated").css("-webkit-animation-play-state", "paused");

  // Dropar o passarinho do footer
  var playerbottom = $("#player").position().top + $("#player").width(); // Usamos porque ele irá rotacionar 90º
  var floor = $("#flyarea-game").height();
  var movey = Math.max(0, floor - playerbottom);
  $("#player").transition(
    { y: movey + "px", rotate: 90 },
    1000,
    "easeInOutCubic"
  );

  // Este é o tempo para mudar os estados. Vamos considerar a scorescreen para desabilitar o click/jump
  currentstate = states.ScoreScreen;

  // Destroi todos os games loops
  clearInterval(loopGameloop);
  clearInterval(loopPipeloop);
  loopGameloop = null;
  loopPipeloop = null;

  // Mobile browsers não suportam buzz bindOnce event
  if (isIncompatible.any()) {
    // Mostra o score
    showScore();
  } else {
    // Começa o hit sound e depois o som de morte e depois mostra o score
    soundHit.play().bindOnce("ended", function() {
      soundDie.play().bindOnce("ended", function() {
        showScore();
      });
    });
  }
}