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
    this.handleUserReadyOnClick = this.handleUserReadyOnClick.bind(this);
  }

  componentDidMount() {
    const { username } = this.props;

    this.socket.emit('new user', username);
    this.socket.on('update players', (players) => {
      this.setState({ players });
    });
  }

  handleUserReadyOnClick(e) {
    e.preventDefault();
    this.socket.emit('player ready', username);
    //TODO: Pass reeady status to props to playerId
  }

  handleUserLeaveOnClick(e) {
    e.preventDefault();
    const { username, toggleLogin } = this.props;

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
    const { username, role } = this.props;
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
        <div id="lobby-player-role">
          <h4>
            You are a {role}
          </h4>
          {role === 'moderator'
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
                handleUserReadyOnClick={this.handleUserReadyOnClick}
              />
            )
          }
        </div>
        <div id="player-list-container">
          <div id="player-list-header">
          Player List
          </div>
          <div id="player-list-row">
            {players.map(player => <PlayerId name={player} image={null} />)}
          </div>
        </div>
        <Chat username={username} />
      </div>
    );
  }
}
