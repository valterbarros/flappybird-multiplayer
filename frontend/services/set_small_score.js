/* eslint global-require: 0 */

export default function setSmallScore() {
  // Seta o score obtido pelo jogador com a imagem pequena
  const elemscore = $("#currentscore")
  elemscore.empty()

  const digits = score.toString().split("")
  for (let i = 0; i < digits.length; i += 1) {
    const src = `${require(`../components/the-game/static/font_small_${
      digits[i]
    }.png`)}`
    elemscore.append(`<img src=${src} alt=''>`)
  }
}
