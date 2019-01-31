import React from 'react';

export default class ModeratorControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      handleUserLeaveOnClick,
      handleMakeModeratorOnClick,
      handleStartGameOnClick
    } = this.props;

    return (
      <div id="moderator-container">
        <h2>Moderator Controls</h2>
        Kick User
        <button type="submit" onClick={handleStartGameOnClick}>Start Game</button>
        <button type="submit" onClick={handleMakeModeratorOnClick}>Make Moderator</button>
        <button type="submit" onClick={handleUserLeaveOnClick}>Leave Game</button>
      </div>
    );
  }
}
