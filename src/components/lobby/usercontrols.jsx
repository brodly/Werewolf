import React from 'react';

const UserControls = ({
  handleUserLeaveOnClick,
  handleUserReadyOnClick,
}) => (
  <div id="user-container">
    <h2>User Controls</h2>
    <button type="submit" onClick={handleUserReadyOnClick}>Ready</button>
    <button type="submit" onClick={handleUserLeaveOnClick}>Leave Game</button>
  </div>
);

export default UserControls;
