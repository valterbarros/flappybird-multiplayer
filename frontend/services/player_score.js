import * as buzz from "buzz/dist/buzz.min"
import setBigScore from "./set_big_score"
import soundPointOgg from "../components/the-game/static/sounds/sfx_point.ogg"

const soundScore = new buzz.sound(soundPointOgg)

export default function playerScore() {
  score += 1
  soundScore.stop()
  soundScore.play()
  setBigScore()
}
