import React from 'react';
import Player from './player';

export default class Villager extends React.Component {
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
      <div id="villager-container">
        <h3>Villager</h3>
        <button type="button" onClick={this.onClick} value="Kill">Kill</button>
        <div id="player-list-row">
          {players.map(villager => (villager ? (
            <Player
              name={villager.username}
              subtitle={villager.alive}
              status={villager.selected}
            />
          ) : null))}
        </div>
      </div>
    );
  }
}
