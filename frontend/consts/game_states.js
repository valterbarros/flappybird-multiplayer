window.currentstate = 0
window.replayclickable = false
window.loopGameloop = ""
window.loopPipeloop = ""
window.score = 0
window.highscore = 0
window.gravity = 0.25

window.pipeheight = 90
window.pipewidth = 52
window.pipes = []

window.states = Object.freeze({
  SplashScreen: 0,
  GameScreen: 1,
  ScoreScreen: 2
})
