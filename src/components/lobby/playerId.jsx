import React from 'react';

const PlayerId = ({ name, image, ready, handlePlayerSelectOnClick }) => {
  const onClick = (e) => {
    e.preventDefault();
    handlePlayerSelectOnClick(name);
  };

  return (
    <div id="player-id-container" onClick={onClick}>
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
};

export default PlayerId;
