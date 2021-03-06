import playerDead from "./player_dead"
import playerScore from "./player_score"

function playerTouchFooter(box) {
  return box.bottom >= $("#footer-game").offset().top
}

function playerTouchTop(boxtop) {
  const ceiling = $("#ceiling")
  return boxtop <= ceiling.offset().top + ceiling.height()
}

// Função de Game Loop
export default function gameLoop() {
  // Upar a posição e velocidade do player

  $(".js-flappy-player").each(function flappyBirdGameLoop() {
    this.self.incrementVelocity(gravity)
    this.self.incrementPosition()
    this.self.updatePlayer()

    // // Criar o hack de bouding box para o player
    const box = this.getBoundingClientRect()
    const origwidth = 34.0
    const origheight = 24.0

    const boxwidth = origwidth - Math.sin(Math.abs(this.self.rotation) / 90) * 8
    const boxheight =
      origheight - Math.sin(Math.abs(this.self.rotation) / 90) * 8
    const boxleft = (box.width - boxwidth) / 2 + box.left
    const boxtop = (box.height - boxheight) / 2 + box.top
    const boxright = boxleft + boxwidth
    const boxbottom = boxtop + boxheight

    if (playerTouchFooter(box)) {
      playerDead(this)
    }

    if (playerTouchTop(boxtop)){
      this.self.position = 0
    }

    // Se não houver nenhum cano no jogo retorna
    if (pipes[0] == null) return

    // Determina a área para os próximos canos
    const nextpipe = pipes[0]
    const nextpipeupper = nextpipe.children(".pipe_upper")

    const pipetop = nextpipeupper.offset().top + nextpipeupper.height()
    const pipeleft = nextpipeupper.offset().left - 2 // Por algum motivo ele começa no deslocamento dos tubos internos , e não os tubos exteriores
    const piperight = pipeleft + pipewidth
    const pipebottom = pipetop + pipeheight

    // O que acontece se cair dentro do tubo
    if (boxright > pipeleft) {
      // Estamos dentro dos tubos, já passamos pelo tubo superior e inferior?
      if (boxtop > pipetop && boxbottom < pipebottom) {
        // sim, estamos dentro dos limites!
      } else {
        // não podemos pular estando dentro do cano, você morreu! return game!
        playerDead(this)
        return
      }
    }

    // Já passamos o cano?
    if (boxleft > piperight) {
      // se sim, remove e aparece outro
      pipes.splice(0, 1)

      // pontua a partir do momento que vai passando
      playerScore()
    }
  })
}
