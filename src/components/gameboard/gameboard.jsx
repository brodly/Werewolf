import React from 'react';
import Player from './player';
import Villager from './villager';
import Seer from './seer';
import Doctor from './doctor';
import Wolf from './wolf';

export default class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.role = (() => {
      const { role } = this.props;

      switch (role) {
        case 'wolf': return <Wolf />;
        case 'villager': return <Villager />;
        case 'seer': return <Seer />;
        case 'doctor': return <Doctor />;
        default: return 'Error: No role selected ';
      }
    })();
  }

  render() {
    const { players } = this.props;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Gameboard</h3>
        </div>
        <div id="player-list-container">
          <div id="player-list-header">
            Player List
          </div>
          <div id="player-list-row">
            {players.map(player => (
              <Player
                name={player}
                image="Player Image"
                handlePlayerSelectOnClick={this.handlePlayerSelectOnClick}
              />
            ))}
          </div>
        </div>
        <div id="player-role-container">
          {this.role}
        </div>
      </div>
    );
  }
}
