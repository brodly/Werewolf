import React from 'react';

const UserControls = ({
  handleUserLeaveOnClick,
  handleUserReadyOnClick,
}) => (
  <div id="user-container">
    <h2>User Controls</h2>
    <button id="controls" type="submit" onClick={handleUserReadyOnClick}>Ready</button>
    <button id="controls" type="submit" onClick={handleUserLeaveOnClick}>Leave Game</button>
  </div>
);

export default UserControls;
