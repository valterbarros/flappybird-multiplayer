/* eslint global-require: 0 */

// Função para setar a pontuação e aparecer na tela as imagens grande de pontuação
export default function setBigScore(erase) {
  const elemscore = $("#bigscore")
  elemscore.empty()

  if (erase) return

  const digits = score.toString().split("")
  for (let i = 0; i < digits.length; i += 1) {
    const src = `${require(`../components/the-game/static/font_big_${digits[i]}.png`)}`
    elemscore.append(`<img src=${src} alt=''>`)
  }
}
