/* eslint func-names: 0 */
/* eslint object-shorthand: 0 */

const isIncompatible = {
  Android: function() {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Safari: function() {
    return (
      navigator.userAgent.match(/OS X.*Safari/) &&
      !navigator.userAgent.match(/Chrome/)
    )
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function() {
    return (
      isIncompatible.Android() ||
      isIncompatible.BlackBerry() ||
      isIncompatible.iOS() ||
      isIncompatible.Opera() ||
      isIncompatible.Safari() ||
      isIncompatible.Windows()
    )
  }
}

export default isIncompatible
