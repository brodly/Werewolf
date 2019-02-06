import React from 'react';
import io from 'socket.io-client';
import Player from './player';
import Villager from './villager';
import Seer from './seer';
import Doctor from './doctor';
import Wolf from './wolf';

export default class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'villager',
    };

    this.socket = io();

    this.roleDisplay = (() => {
      const { role } = this.state;

      switch (role) {
        case 'wolf': return <Wolf />;
        case 'villager': return <Villager />;
        case 'seer': return <Seer />;
        case 'doctor': return <Doctor />;
        default: return 'Error: No role selected ';
      }
    })();
  }

  componentDidMount() {
    const { username } = this.props;

    this.socket.emit('get role', username);
    this.socket.on('set role', (role) => {
      console.log(role);
    });
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
          {this.roleDisplay}
        </div>
      </div>
    );
  }
}
