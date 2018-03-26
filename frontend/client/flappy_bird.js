import createChannel from "client/cable";

const actions = {
  DOJUMP: 'do_jump',
  ADDNEWPLAYER: 'add_new_player'
}

let doJumpCallback, addNewPlayerCallback;

const flappyBird = createChannel("FlappyBirdChannel", {
  received(data) {
    if(data.action === actions.DOJUMP){
      doJumpCallback();
    }
    if(data.action === actions.ADDNEWPLAYER){
      addNewPlayerCallback();
    }
  }
});

function doJump() {
  flappyBird.perform("do_jump");
}

function setDoJumpCallback(fn) {
  doJumpCallback = fn;
}

function setAddNewPlayerCallback(fn) {
  addNewPlayerCallback = fn;
}

export { doJump, setDoJumpCallback, setAddNewPlayerCallback };
