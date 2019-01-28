import React from 'react';

const PlayerId = ({ name, image, ready }) => (
  <div id="player-id-container">
    <div id="player-id-name">
      {name}
      <p />
    </div>
    <div id="player-id-image">
      TODO: Display Player Image Here
      {image}
    </div>
    <div id="player-ready-status">
      {ready}
    </div>
  </div>
);

export default PlayerId;
