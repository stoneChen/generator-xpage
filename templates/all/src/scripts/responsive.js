// 在设备为750的情况下1rem = 100px
(function (win, doc) {
  const baseWidth = 750
  const documentHTML = doc.documentElement

  function setRootFont () {
    const fontSize = window.innerWidth / baseWidth
    documentHTML.style.fontSize = fontSize * 100 + 'px'
  }

  setRootFont()
  win.addEventListener('resize', setRootFont, false)
})(window, document)
