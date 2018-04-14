import "./fb-main.css";
import "./static/replay.png";
import "./static/font_big_0.png";
import "./static/font_big_1.png";
import "./static/font_big_2.png";
import "./static/font_big_3.png";
import "./static/font_big_4.png";
import "./static/font_big_5.png";
import "./static/font_big_6.png";
import "./static/font_big_7.png";
import "./static/font_big_8.png";
import "./static/font_big_9.png";
import "./static/font_small_0.png";
import "./static/font_small_1.png";
import "./static/font_small_2.png";
import "./static/font_small_3.png";
import "./static/font_small_4.png";
import "./static/font_small_5.png";
import "./static/font_small_6.png";
import "./static/font_small_7.png";
import "./static/font_small_8.png";
import "./static/font_small_9.png";
import "./static/sounds/sfx_wing.ogg";
import "./static/sounds/sfx_point.ogg";
import "./static/sounds/sfx_hit.ogg";
import "./static/sounds/sfx_die.ogg";
import "./static/sounds/sfx_swooshing.ogg";
import * as buzz from "./fb-buzz.min.js";
import * as $ from "./fb-jquery.min.js";
import "./fb-jquery.transit.min.js";
import Player from 'components/player/player'

/* 
   /// DEFININDO AS VARIÁVEIS ////
*/

// Modo de depuração do jogo - Lógico (true or false)
var debugmode = false;

// Objeto para congelar dependendo dos estados
window.states = Object.freeze({
  SplashScreen: 0,
  GameScreen: 1,
  ScoreScreen: 2
});

// Definição das vars de lógica
var currentstate = 0;
var gravity = 0.25;
var velocity = 0;
var position = 180;
var rotation = 0;
var jump = -4.6;

// Definição das vars da pontuação min e máxima
var score = 0;
var highscore = 0;

// Definição das vars do cano
var pipeheight = 90;
var pipewidth = 52;
var pipes = new Array();

// Definição da var de replay
var replayclickable = false;

// Definição dos sons
var volume = 30;
const soundJump = new buzz.sound(require("components/the-game/static/sounds/sfx_wing.ogg"));
var soundScore = new buzz.sound(require("./static/sounds/sfx_point.ogg"));
var soundHit = new buzz.sound(require("./static/sounds/sfx_hit.ogg"));
var soundDie = new buzz.sound(require("./static/sounds/sfx_die.ogg"));
var soundSwoosh = new buzz.sound(require("./static/sounds/sfx_swooshing.ogg"));
buzz.all().setVolume(volume);

// Definição dos loops do jogo e dos canos
var loopGameloop;
var loopPipeloop;

// Assim que o documento carregar começa a depuração do jogo
$(document).ready(function() {
  if (window.location.search == "?debug") debugmode = true;
  if (window.location.search == "?easy") pipeheight = 200;

  // capturar o highscore pelo cookie
  var savedscore = getCookie("highscore");
  if (savedscore != "") highscore = parseInt(savedscore);

  // Começar com a tela inicial
  showSplash();
});

/* 
   /// FUNÇÕES DO JOGO ////
*/

// Função para capturar o cookie para mostrar o score posteriormente
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

// Função para setar o cookie por nome, valor e tempo para expirar
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

// Função mostrar a splash screen
function showSplash() {
  // variavel para armazenar o estado do jogo e tratar posteriormente os eventos
  currentstate = states.SplashScreen;

  // setar os valores iniciais
  velocity = 0;
  position = 180;
  rotation = 0;
  score = 0;

  // resetar as posições do player para o novo jogo
  $("#player").css({ y: 0, x: 0 });
  updatePlayer($("#player"));

  soundSwoosh.stop();
  soundSwoosh.play();

  // limpar todos os canos para iniciar o novo jogo
  $(".pipe").remove();
  pipes = new Array();

  // começar todas as animações dos sprites novamente
  $(".animated").css("animation-play-state", "running");
  $(".animated").css("-webkit-animation-play-state", "running");

  // fade para a splash screen aparecer
  $("#splash").transition({ opacity: 1 }, 2000, "ease");
}

// Função para começar o jogo
function startGame() {
  // variavel para armazenar o estado do jogo e tratar posteriormente os eventos
  currentstate = states.GameScreen;

  // fade para a splash screen sumir
  $("#splash").stop();
  $("#splash").transition({ opacity: 0 }, 500, "ease");

  // ir mostrando o score no topo do jogo
  setBigScore();

  // debug mode para considerar as bordas ao redor
  if (debugmode) {
    $(".boundingbox").show();
  }

  // começar os loops do jogo - aumentar o tempo e intervalo de canos
  var updaterate = 1000.0 / 60.0; // 60 fps
  const player = new Player()
  console.log(player)
  loopGameloop = setInterval(gameloop.bind(null, player), updaterate);
  loopPipeloop = setInterval(updatePipes, 1400);

  // ação de pulo para começar o jogo
  playerJump();
}

// Função para upar a velocidade e a rotação do palyer
function updatePlayer(player) {
  // Rotação
  rotation = Math.min(velocity / 10 * 90, 90);

  // Aplicando a rotação por css (X,Y)
  $(player).css({ rotate: rotation, top: position });
}

// Função de Game Loop
function gameloop(player) {
  // var player = $("#player");

  // Upar a posição e velocidade do player

  player.velocity += gravity;
  player.position += player.velocity;
  player.updatePlayer()

  // // Aplicar os novos valores do player
  // updatePlayer(player);
  //
  // // Criar o hack de bouding box para o player
  // var box = document.getElementById("player").getBoundingClientRect();
  // var origwidth = 34.0;
  // var origheight = 24.0;
  //
  // //console.log(box);
  // var boxwidth = origwidth - Math.sin(Math.abs(rotation) / 90) * 8;
  // var boxheight = origheight - Math.sin(Math.abs(rotation) / 90) * 8;
  // var boxleft = (box.width - boxwidth) / 2 + box.left;
  // var boxtop = (box.height - boxheight) / 2 + box.top;
  // var boxright = boxleft + boxwidth;
  // var boxbottom = boxtop + boxheight;
  //
  // // Se acertar o footer, o player morre e retorna o jogo
  // if (box.bottom >= $("#footer-game").offset().top) {
  //   playerDead();
  //   return;
  // }
  //
  // // Se tentar passar pelo topo, zera a posição dele no topo
  // var ceiling = $("#ceiling");
  // if (boxtop <= ceiling.offset().top + ceiling.height()) position = 0;
  //
  // // Se não houver nenhum cano no jogo retorna
  // if (pipes[0] == null) return;
  //
  // // Determina a área para os próximos canos
  // var nextpipe = pipes[0];
  // var nextpipeupper = nextpipe.children(".pipe_upper");
  //
  // var pipetop = nextpipeupper.offset().top + nextpipeupper.height();
  // var pipeleft = nextpipeupper.offset().left - 2; // Por algum motivo ele começa no deslocamento dos tubos internos , e não os tubos exteriores
  // var piperight = pipeleft + pipewidth;
  // var pipebottom = pipetop + pipeheight;
  //
  // // O que acontece se cair dentro do tubo
  // if (boxright > pipeleft) {
  //   // Estamos dentro dos tubos, já passamos pelo tubo superior e inferior?
  //   if (boxtop > pipetop && boxbottom < pipebottom) {
  //     // sim, estamos dentro dos limites!
  //   } else {
  //     // não podemos pular estando dentro do cano, você morreu! return game!
  //     playerDead();
  //     return;
  //   }
  // }
  //
  // // Já passamos o cano?
  // if (boxleft > piperight) {
  //   // se sim, remove e aparece outro
  //   pipes.splice(0, 1);
  //
  //   // pontua a partir do momento que vai passando
  //   playerScore();
  // }
}

// Função para passar o pulo e o som
function playerJump() {
  velocity = jump;
  // iniciar o som com o pulo
  soundJump.stop();
  soundJump.play();
}

// Função para setar a pontuação e aparecer na tela as imagens grande de pontuação
function setBigScore(erase) {
  var elemscore = $("#bigscore");
  elemscore.empty();

  if (erase) return;

  var digits = score.toString().split("");
  for (var i = 0; i < digits.length; i++)
    var src = `${require("./static/font_big_" + digits[i] + ".png")}`;
  elemscore.append(`<img src=${src} alt=''>`);
}

// Função para setar a pontuação pequena e aparecer na tela as imagens de pequena pontuação
function setSmallScore() {
  // Seta o score obtido pelo jogador com a imagem pequena
  var elemscore = $("#currentscore");
  elemscore.empty();

  var digits = score.toString().split("");
  for (var i = 0; i < digits.length; i++)
    var src = `${require("./static/font_small_" + digits[i] + ".png")}`;
  elemscore.append(`<img src=${src} alt=''>`);
}

// Função para setar a pontuação pequena e aparecer na tela as imagens de pequena pontuação
function setHighScore() {
  // Seta o maior score já obtido pelo jogador e mostra na tela
  var elemscore = $("#highscore");
  elemscore.empty();

  var digits = highscore.toString().split("");
  for (var i = 0; i < digits.length; i++)
    var src = `${require("./static/font_small_" + digits[i] + ".png")}`;
  elemscore.append(`<img src=${src} alt=''>`);
}

// Função para setar a medalha de acordo com a pontuação obtida
function setMedal() {
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

  var src = `${require("./static/medal_" + medal + ".png")}`;
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

// Função para mostrar o score
function showScore() {
  // Mostra o quadro do score
  $("#scoreboard").css("display", "block");

  // Remove o big score da tela
  setBigScore(true);

  // Se o score obtido for maior que o maior score já obtido
  if (score > highscore) {
    // Salva o score
    highscore = score;
    // Salva no cookie
    setCookie("highscore", highscore, 999);
  }

  // Muda o quadro de score
  setSmallScore();
  setHighScore();
  var wonmedal = setMedal();

  // som do SWOOSH!
  soundSwoosh.stop();
  soundSwoosh.play();

  // Mostra o quadro de score
  $("#scoreboard").css({ y: "40px", opacity: 0 }); // Move o quadro de score para biaxo
  $("#replay").css({ y: "40px", opacity: 0 });
  $("#scoreboard").transition(
    { y: "0px", opacity: 1 },
    600,
    "ease",
    function() {
      // Qaundo a animação terminar começa o som de SWOOSH!
      soundSwoosh.stop();
      soundSwoosh.play();
      $("#replay").transition({ y: "0px", opacity: 1 }, 600, "ease");

      // também animal a medalha para aparecer no quadro de score
      if (wonmedal) {
        $("#medal").css({ scale: 2, opacity: 0 });
        $("#medal").transition({ opacity: 1, scale: 1 }, 1200, "ease");
      }
    }
  );

  // deixa o botão de replay com clique
  replayclickable = true;
}

$("#replay").click(function() {
  // Podemos deixar a ação de replay com clique também
  if (!replayclickable) return;
  else replayclickable = false;
  //SWOOSH!
  soundSwoosh.stop();
  soundSwoosh.play();

  // Fade para o quadro de score sumir
  $("#scoreboard").transition(
    { y: "-40px", opacity: 0 },
    1000,
    "ease",
    function() {
      // Esconde o quadro de score
      $("#scoreboard").css("display", "none");

      // começa o game over e mostra a splash screen
      showSplash();
    }
  );
});

// Função para armazenar a pontuação do jogador
function playerScore() {
  score += 1;
  soundScore.stop();
  soundScore.play();
  setBigScore();
}

// Função para ir mostrando e mudar os canos
function updatePipes() {
  // Existe algum cano para remover?
  $(".pipe")
    .filter(function() {
      return $(this).position().left <= -100;
    })
    .remove();

  // Add um novo cano (top height + bottom height  + pipeheight == 420) e coloca o cano em outra área
  var padding = 80;
  var constraint = 420 - pipeheight - padding * 2; // duplicando a margem interna
  var topheight = Math.floor(Math.random() * constraint + padding); // add padding abaixo
  var bottomheight = 420 - pipeheight - topheight;
  var newpipe = $(
    '<div class="pipe animated"><div class="pipe_upper" style="height: ' +
      topheight +
      'px;"></div><div class="pipe_lower" style="height: ' +
      bottomheight +
      'px;"></div></div>'
  );
  $("#flyarea-game").append(newpipe);
  pipes.push(newpipe);
}

// Definindo o suporte dos navegadores para o event Buzz definido anteriormente
var isIncompatible = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Safari: function() {
    return (
      navigator.userAgent.match(/OS X.*Safari/) &&
      !navigator.userAgent.match(/Chrome/)
    );
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (
      isIncompatible.Android() ||
      isIncompatible.BlackBerry() ||
      isIncompatible.iOS() ||
      isIncompatible.Opera() ||
      isIncompatible.Safari() ||
      isIncompatible.Windows()
    );
  }
};

function setVelocity(value){
  velocity = value
}

export { startGame, setVelocity, jump, currentstate, states }
