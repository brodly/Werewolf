import React from 'react';

const ModeratorControls = ({
  handleUserLeaveOnClick,
  handleMakeModeratorOnClick,
  handleStartGameOnClick,
}) => (
  <div id="moderator-container">
    <h2>Moderator Controls</h2>
    Kick User
    <button type="submit" onClick={handleStartGameOnClick}>Start Game</button>
    <button type="submit" onClick={handleMakeModeratorOnClick}>Make Moderator</button>
    <button type="submit" onClick={handleUserLeaveOnClick}>Leave Game</button>
  </div>
);

export default ModeratorControls;
