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
      playerSelected: null,
    };

    this.socket = io();
    this.handleRemoveUserOnClick = this.handleRemoveUserOnClick.bind(this);
    this.handleStartGameOnClick = this.handleStartGameOnClick.bind(this);
    this.handleUserLeaveOnClick = this.handleUserLeaveOnClick.bind(this);
    this.handleUserReadyOnClick = this.handleUserReadyOnClick.bind(this);
    this.handleMakeModeratorOnClick = this.handleMakeModeratorOnClick.bind(this);
    this.handlePlayerSelectOnClick = this.handlePlayerSelectOnClick.bind(this);
  }

  /*
    On lobby creation for a new player:
    - Emit a 'new user' event with a username string to the socket.io server
    - Listener event for 'update' player which get an updated
      array of player objects
  */
  componentDidMount() {
    const { username } = this.props;

    this.socket.emit('new user', username);
    this.socket.on('update players', (players) => {
      this.setState({ players });
    });
  }

  /*
    Handles the click action when a user clicks ready
    - Emits a 'player ready' event with username string
  */
  handleUserReadyOnClick(e) {
    e.preventDefault();
    this.socket.emit('player ready', username);
    //TODO: Pass reeady status to props to playerId
  }

  /*
    Handles on click event for when a player leave game
    - Emits 'player leave' event with username string
    - Disconnects socket connection
    - Toggles client login status to false, bringing user back to login page
  */
  handleUserLeaveOnClick(e) {
    e.preventDefault();
    const { username, toggleLogin } = this.props;

    this.socket.emit('player leave', username);
    this.socket.disconnect();
    toggleLogin();
  }

  /*
    Handles on click event when moderator removes a user
    - Emit 'remove player' event with playerSelect string
  */
  handleRemoveUserOnClick() {
    console.log('User Removed');
  }

  /*
    Handles on click event when moderator starts the game
    - Emit 'start game' event
  */
  handleStartGameOnClick() {
    this.socket.emit('start game');
  }

  /*
    Handles on click event when moderator gives up moderator to another player
    - Emit 'update moderator' event with playerSelected string
      indicated the player to switch controls to
  */
  handleMakeModeratorOnClick() {
    const { playerSelected } = this.state;
    this.socket.emit('update moderator', playerSelected);
  }

  handlePlayerSelectOnClick(playerSelected) {
    this.setState({ playerSelected });
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
          <div id="player-list-header">
          Player List
          </div>
          <div id="player-list-row">
            {players.map(player => (
              <PlayerId
                name={player}
                image={null}
                handlePlayerSelectOnClick={this.handlePlayerSelectOnClick}
              />
            ))}
          </div>
        </div>
        <Chat username={username} />
      </div>
    );
  }
}
