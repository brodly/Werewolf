import React from 'react';
import io from 'socket.io-client';
import PlayerId from './playerId';
import ModeratorControls from './moderatorcontrols';
import UserControls from './usercontrols';
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
    const {
      username,
      role,
      handleSwitchDisplay,
      players
    } = this.props;
    // const { players } = this.state;

    if (role === 'moderator') {
      const message = {
        username: null,
        message: `${username} has created a new game`,
      };
      this.socket.emit('chat message', message);
    } else {
      this.socket.emit('new user', username);
    }



    this.socket.on('update player ready', (playerStatus) => {
      console.log(playerStatus);
    });

    this.socket.on('start game', () => {
      handleSwitchDisplay('gameboard');
    });
  }

  /*
    Handles the click action when a user clicks ready
    - Emits a 'player ready' event with username string
  */
  handleUserReadyOnClick(e) {
    e.preventDefault();
    const { username } = this.props;
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
    this.socket.emit('try start game');
  }

  /*
    Handles on click event when moderator gives up moderator to another player
    - Emit 'update moderator' event with playerSelected string
      indicated the player to switch controls to
  */
  handleMakeModeratorOnClick() {
    const { playerSelected } = this.state;
    console.log('this feature has not been implemented');
    this.socket.emit('chat message', { username: null, message: 'this feature has not been implemented' });
    // this.socket.emit('update moderator', playerSelected);
  }

  handlePlayerSelectOnClick(playerSelected) {
    this.setState({ playerSelected });
  }

  render() {
    const { username, role, ready, players } = this.props;
    // const { players } = this.state;

    return (
      <div id="main-container">
        <div id="main-header">
          <h3>Lobby</h3>
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
          <div id="player-list-header">
          Player List
          </div>
          <div id="player-list-row">
            {players.map(player => (
              <PlayerId
                name={player}
                ready={ready}
                image="Player Image"
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
