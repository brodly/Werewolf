import React from 'react';

export default class ModeratorControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { handleUserLeaveOnClick } = this.props;
    return (
      <div id="moderator-container">
        <h2>Moderator Controls</h2>
        Kick User
        Start Game
        <button type="submit" onClick={handleUserLeaveOnClick}>Leave Game</button>
      </div>
    );
  }
}
