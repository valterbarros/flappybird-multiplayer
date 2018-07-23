import "javascripts/fb-jquery.transit.min"

export default function showSplash() {
  // variavel para armazenar o estado do jogo e tratar posteriormente os eventos
  currentstate = states.SplashScreen

  // setar os valores iniciais
  // velocity = 0;
  // position = 180;
  // rotation = 0;
  // score = 0;

  // resetar as posições do player para o novo jogo
  $(".js-flappy-player").css({ y: 0, x: 0 })
  // updatePlayer($(".js-flappy-player"));

  // resetar sons
  // soundSwoosh.stop();
  // soundSwoosh.play();

  // limpar todos os canos para iniciar o novo jogo
  $(".pipe").remove()
  pipes = []

  // começar todas as animações dos sprites novamente
  $(".animated").css("animation-play-state", "running")
  $(".animated").css("-webkit-animation-play-state", "running")

  // fade para a splash screen aparecer
  $("#splash").transition({ opacity: 1 }, 2000, "ease")
}
