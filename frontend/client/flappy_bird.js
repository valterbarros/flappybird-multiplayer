import createChannel from "client/cable";

const actions = {
  DOJUMP: 'do_jump',
  ADDNEWPLAYER: 'add_new_player'
}

let doJumpCallback, addNewPlayerCallback;

const flappyBird = createChannel("FlappyBirdChannel", {
  received(data) {
    if(data.action === actions.DOJUMP){
      doJumpCallback(data);
    }
    if(data.action === actions.ADDNEWPLAYER){
      addNewPlayerCallback(data.id);
    }
  }
});

function doJump(playerId) {
  flappyBird.perform("do_jump", { playerId });
}

//Callbacks
function setDoJumpCallback(fn){
  doJumpCallback = fn;
}

function setAddNewPlayerCallback(fn) {
  addNewPlayerCallback = fn;
}

export { doJump, setDoJumpCallback, setAddNewPlayerCallback };
