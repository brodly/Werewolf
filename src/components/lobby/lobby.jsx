import React from 'react';
import io from 'socket.io-client';
import PlayerId from './playerId';
import ModeratorControls from '../moderatorcontrols';
import UserControls from '../usercontrols';
import Chat from './chat';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };

    this.socket = io();
    this.handleRemoveUserOnClick = this.handleRemoveUserOnClick.bind(this);
    this.handleStartGameOnClick = this.handleStartGameOnClick.bind(this);
    this.handleUserLeaveOnClick = this.handleUserLeaveOnClick.bind(this);
  }

  componentDidMount() {
    const { username } = this.props;

    this.socket.emit('new user', username);
    this.socket.on('update players', (players) => {
      this.setState({ players });
    });
  }

  handleUserLeaveOnClick(e) {
    const { username, toggleLogin } = this.props;
    e.preventDefault();

    this.socket.emit('player leave', username);
    this.socket.disconnect();
    toggleLogin();
  }

  handleRemoveUserOnClick() {
    console.log('User Removed');
  }

  handleStartGameOnClick() {
    console.log('Game Started');
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
            You are a {type}
          </h4>
          {type === 'moderator'
            ? (
              <ModeratorControls
                handleRemoveUserOnClick={this.handleRemoveUserOnClick}
                handleStartGameOnClick={this.handleStartGameOnClick}
                handleUserLeaveOnClick={this.handleUserLeaveOnClick}
              />
            )
            : (
              <UserControls
                handleUserLeaveOnClick={this.handleUserLeaveOnClick}
              />
            )
          }
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
