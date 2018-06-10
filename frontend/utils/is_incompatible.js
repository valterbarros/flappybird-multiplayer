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

export { isIncompatible };