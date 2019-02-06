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
    this.updateRole = this.updateRole.bind(this);
  }

  componentDidMount() {
    const { username } = this.props;

    this.socket.emit('get role', username);
    this.socket.on('set role', (role) => {
      this.setState({ role });
    });
  }

  updateRole() {
    const { role } = this.state;

    return (() => {
      switch (role) {
        case 'wolves': return <Wolf />;
        case 'villagers': return <Villager />;
        case 'seers': return <Seer />;
        case 'doctors': return <Doctor />;
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
          {this.updateRole()}
        </div>
      </div>
    );
  }
}
