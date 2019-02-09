import React from 'react';
import Player from './player';

export default class Seer extends React.Component {
  constructor() {
    super();
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
      <div id="seer-container">
        <h3>Seer</h3>
        <button type="button" onClick={this.onClick} value="Reveal">Reveal</button>
        <div id="player-list-row">
          {players.map(seer => (seer ? (
            <Player
              name={seer.username}
              subtitle={seer.alive}
              status={seer.selected}
            />
          ) : null))}
        </div>
      </div>
    );
  }
}
