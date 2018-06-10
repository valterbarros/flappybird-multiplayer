import Player from "components/player/player";
import { setAddNewPlayerCallback } from "client/flappy_bird";

function addPlayer(id) {
  const player = new Player(id);
  player.render();
  player._player().get(0).self = player;
}

setAddNewPlayerCallback(addPlayer);