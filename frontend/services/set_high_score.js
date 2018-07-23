/* eslint global-require: 0 */

export default function setHighScore() {
  // Seta o maior score já obtido pelo jogador e mostra na tela
  const elemscore = $("#highscore")
  elemscore.empty()

  const digits = highscore.toString().split("")
  for (let i = 0; i < digits.length; i += 1) {
    const src = `${require(`../components/the-game/static/font_small_${
      digits[i]
    }.png`)}`
    elemscore.append(`<img src=${src} alt=''>`)
  }
}
