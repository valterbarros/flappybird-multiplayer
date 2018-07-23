export default function updatePipes() {
  // Existe algum cano para remover?
  $(".pipe")
    .filter(function filterPipe() {
      return $(this).position().left <= -100
    })
    .remove()

  // Add um novo cano (top height + bottom height  + pipeheight == 420) e coloca o cano em outra área
  const padding = 80
  const constraint = 420 - pipeheight - padding * 2 // duplicando a margem interna
  const topheight = Math.floor(Math.random() * constraint + padding) // add padding abaixo
  const bottomheight = 420 - pipeheight - topheight
  const newpipe = $(
    `<div class="pipe animated"><div class="pipe_upper" style="height:
      ${topheight}px;"></div><div class="pipe_lower" style="height: ${bottomheight}px;"></div></div>'`
  )
  $("#flyarea-game").append(newpipe)
  pipes.push(newpipe)
}
