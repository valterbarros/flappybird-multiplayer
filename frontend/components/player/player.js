import * as buzz from "components/the-game/fb-buzz.min.js";

export default class Player{
  constructor(id){
    this.id = id;
    this.rotation = 0;
    this.velocity = 0;
    this.position = 180;
    this.rendered = false;
    this.jump = -4.6;
    this.soundJump =
      new buzz.sound(require("components/the-game/static/sounds/sfx_wing.ogg"));
  }

  render(){
    if(!this.rendered){
      const html = `<div id="${this.id}-player" class="bird animated js-flappy-player"></div>`;
      $('#flyarea-game').append(html);
      this.rendered = true;
    }
  }

  updatePlayer(){
    this.rotation = Math.min(this.velocity / 10 * 90, 90);

    $(this._player()).css({ 'transform' : 'rotate('+ this.rotation +'deg)', top: this.position });
  }

  doJump(){
    this.velocity = this.jump;
    this.soundJump.stop();
    this.soundJump.play();
  }

  incrementVelocity(gravity){
    this.velocity += gravity;
  }

  incrementPosition(){
    this.position += this.velocity;
  }

  _player(){
    return $(`#${this.id}-player`)
  }
}
