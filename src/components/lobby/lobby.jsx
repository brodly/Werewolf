/* eslint-disable no-multi-spaces */
import React from 'react';
import PlayerId from './playerId';
import ModeratorControls from './moderatorcontrols';
import UserControls from './usercontrols';
import Chat from './chat';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };

    // INIT SOCKET VARIABLE
    this.socket                       = this.props.socket;

    // METHOD BINDINGS
    this.handleRemoveUserOnClick      = this.handleRemoveUserOnClick.bind(this);
    this.handleStartGameOnClick       = this.handleStartGameOnClick.bind(this);
    this.handleUserLeaveOnClick       = this.handleUserLeaveOnClick.bind(this);
    this.handleUserReadyOnClick       = this.handleUserReadyOnClick.bind(this);
    this.handleMakeModeratorOnClick   = this.handleMakeModeratorOnClick.bind(this);
    this.handlePlayerSelectOnClick    = this.handlePlayerSelectOnClick.bind(this);
  }

  componentDidMount() {
    const { handleSwitchDisplay } = this.props;

    this.socket.on('update player ready', (playerStatus) => {
      console.log(playerStatus);
    });

    this.socket.on('start game', () => {
      handleSwitchDisplay('gameboard');
    });
  }

  handleUserReadyOnClick(e) {
    e.preventDefault();
    const { username } = this.props;
    this.socket.emit('player ready', username);
  }

  handleUserLeaveOnClick(e) {
    e.preventDefault();
    const { username, toggleLogin } = this.props;

    // TODO: IMPLEMENT BUTTON
    // this.socket.emit('player leave', username);
    // this.socket.disconnect();
    // toggleLogin();
  }

  handleRemoveUserOnClick(e) {
    e.preventDefault();
    console.log('User Removed');
  }

  handleStartGameOnClick() {
    this.socket.emit('try start game');
  }

  handleMakeModeratorOnClick() {
    const { selected } = this.state;
    console.log('this feature has not been implemented');
    this.socket.emit('chat message', { username: null, message: 'this feature has not been implemented' });
    // this.socket.emit('update moderator', selected);
  }

  handlePlayerSelectOnClick(selected) {
    this.setState({ selected });
  }

  render() {
    const { selected } = this.state;
    const {
      username,
      role,
      ready,
      players
    } = this.props;

    return (
      <div id="main-container">
        <div id="main-header">
          Lobby
        </div>
        <div id="display-username">
          Hi&nbsp;
          {username}
          !
          <br />
        </div>
        <div id="lobby-player-role">
          {role === 'moderator'
            ? (
              <ModeratorControls
                handleRemoveUserOnClick={this.handleRemoveUserOnClick}
                handleStartGameOnClick={this.handleStartGameOnClick}
                handleUserLeaveOnClick={this.handleUserLeaveOnClick}
                handleMakeModeratorOnClick={this.handleMakeModeratorOnClick}
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
          <div id="player-list-header">Player List</div>
          <div id="player-list-row">
            {players.map(player => (
              <PlayerId
                name={player}
                ready={ready}
                selected={selected}
                image=""
                handlePlayerSelectOnClick={this.handlePlayerSelectOnClick}
              />
            ))}
          </div>
        </div>
        <Chat
          username={username}
          socket={this.socket}
        />
      </div>
    );
  }
}
