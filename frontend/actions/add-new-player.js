import Player from 'components/player/player'
import { setAddNewPlayerCallback } from 'client/flappy_bird'

function addPlayer(){
  const id = "Valter";
  const player = new Player(id);
  player.render();
  player._player().get(0).self = player;
  $('[name=player_id]').attr('id', id)
}

setAddNewPlayerCallback(addPlayer);
