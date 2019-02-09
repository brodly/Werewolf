import React from 'react';
import Player from './player';

export default class Wolf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { handlePlayerSelectOnSubmit } = this.props;
    handlePlayerSelectOnSubmit();
  }

  render() {
    const { players } = this.props;

    return (
      <div id="wolf-container">
        <h3>Wolf</h3>
        <button type="button" onClick={this.onClick} value="Kill">Kill</button>
        <div id="player-list-row">
          {players.map(wolf => (wolf ? (
            <Player
              name={wolf.username}
              subtitle={wolf.alive}
              status={wolf.selected}
            />
          ) : null))}
        </div>
      </div>
    );
  }
}
