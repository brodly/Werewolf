import React from 'react';
import io from 'socket.io-client';
import Player from './player';
import Villager from './villager';
import Seer from './seer';
import Doctor from './doctor';
import Wolf from './wolf';
import Moderator from './moderator';

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
      if (role === null) {
        this.setState({ role: 'moderator' });
      } else {
        this.setState({ role });
      }
    });
  }

  updateRole() {
    const { role } = this.state;

    return (() => {
      switch (role) {
        case 'wolf': return <Wolf />;
        case 'villager': return <Villager />;
        case 'seer': return <Seer />;
        case 'doctor': return <Doctor />;
        case 'moderator': return <Moderator />;
        default: return 'Error: No Role Defined';
      }
    })();
  }

  render() {
    const { username, players } = this.props;
    const { role } = this.state;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Gameboard</h3>
        </div>
         <div id="display-username">
          {username} is a {role}
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
