export default class Player{
  constructor(){
    this.id = Date.now();
    this.rotation = 0;
    this.velocity = 0;
    this.position = 180;
    this.render();
    this.rendered = false;
    this.jump = -4.6;
  }

  render(){
    if(!this.rendered){
      const html = `<div id="${this.id}-player" class="bird animated"></div>`;
      $('#flyarea-game').append(html);
      this.rendered = true;
    }
  }

  updatePlayer(){
    this.rotation = Math.min(this.velocity / 10 * 90, 90);

    $(this._player()).css({ rotate: this.rotation, top: this.position });
  }

  doJump(){
    this.velocity = this.jump;
  }

  _player(){
    return $(`#${this.id}-player`)
  }
}

window.player = Player
