import React from 'react';
import io from 'socket.io-client';
import PlayerId from './playerId';
import Admin from '../admin';
import Chat from './chat';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };

    this.socket = io();
  }

  componentDidMount() {
    const { username } = this.props;

    this.socket.emit('new user', username);
    this.socket.on('update players', (players) => {
      this.setState({ players });
    });
  }

  render() {
    const { username, type } = this.props;
    const { players } = this.state;

    return (
      <div id="lobby-container">
        <div id="lobby-header">
          <h3>Lobby</h3>
        </div>
        <div id="lobby-display-username">
          Hi&nbsp;
          {username}
          !
          <br />
        </div>
        <div id="lobby-player-type">
          <h4>
            You are the game {type}
          </h4>
          {type === 'moderator' ? <Admin /> : null}
        </div>
        <div id="player-list-container">
          Player List
          {players.map(player => <PlayerId name={player} image={null} />)}
        </div>
        <Chat username={username} />
      </div>
    );
  }
}