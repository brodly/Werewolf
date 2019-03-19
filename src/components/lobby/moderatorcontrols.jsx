import React from 'react';

const ModeratorControls = ({
  handleUserLeaveOnClick,
  handleMakeModeratorOnClick,
  handleStartGameOnClick,
}) => (
  <div id="moderator-container">
    <h2>Moderator Controls</h2>
    Kick User
    <button id="controls" type="submit" onClick={handleStartGameOnClick}>Start Game</button>
    <button id="controls" type="submit" onClick={handleMakeModeratorOnClick}>Make Moderator</button>
    <button id="controls" type="submit" onClick={handleUserLeaveOnClick}>Leave Game</button>
  </div>
);

export default ModeratorControls;
