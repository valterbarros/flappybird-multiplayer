/* global $ */
/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0 */

import * as buzz from "buzz/dist/buzz.min"

export default class Player {
  constructor(id) {
    this.id = id
    this.rotation = 0
    this.velocity = 0
    this.old_position = 0
    this.position = 180
    this.rendered = false
    this.new_velocity = 0
    this.jump = -4.6
    this.soundJump = new buzz.sound(
      require("components/the-game/static/sounds/sfx_wing.ogg")
    )
  }

  render() {
    if (!this.rendered) {
      const html = `<div id="${
        this.id
      }-player" class="bird animated js-flappy-player"></div>`
      $("#flyarea-game").append(html)
      this.rendered = true
    }
  }

  updatePlayer() {
    let velocity = 0
    velocity += this.position - this.old_position
    const sigmoid = velocity / (1 + Math.abs(velocity))
    
    this.rotation = Math.min((this.rotation * 0.9) + (sigmoid * 6), 90)

    console.log('sigmoid', Math.min((this.rotation * 0.9) + (sigmoid * 6), 90))
    console.log('oldimplement', Math.min(this.velocity / 10 * 90, 90))

    // this.rotation = Math.min(this.velocity / 10 * 90, 90)

    $(this._player()).css({
      transform: `rotate(${this.rotation}deg)`,
      top: this.position
    })
  }

  doJump() {
    this.velocity = this.jump
    this.soundJump.stop()
    this.soundJump.play()
  }

  incrementVelocity(gravity) {
    this.velocity += gravity
  }

  incrementPosition() {
    this.old_position = this.position

    this.position += this.velocity
  }

  _player() {
    return $(`#${this.id}-player`)
  }
}
