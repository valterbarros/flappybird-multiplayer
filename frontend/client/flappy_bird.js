import createChannel from "client/cable";

let callback;

const flappyBird = createChannel("FlappyBirdChannel", {
  received() {
    if (callback) callback();
  }
});

function doJump() {
  flappyBird.perform("jump");
}

function setCallback(fn) {
  callback = fn;
}

export { doJump, setCallback };
