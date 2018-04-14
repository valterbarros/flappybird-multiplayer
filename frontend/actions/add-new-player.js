import { setAddNewPlayerCallback } from 'client/flappy_bird'

function addPlayer(){
  const html = '<div id="player" class="bird animated"></div>';
  // document.querySelector('#flyarea-game').insertAdjacentHTML('afterbegin', html);
}

setAddNewPlayerCallback(addPlayer);
