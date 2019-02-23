import React from 'react';
import io from 'socket.io-client';

import Timer from './components/gameboard/timer';
import Login from './components/login/login';
import Lobby from './components/lobby/lobby';
import Gameboard from './components/gameboard/gameboard';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      login: false,
      display: 'lobby',
      username: '',
      role: '',
      gameTimer: 5,
      players: [],
    };
    this.socket = io();

    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleCreateGameOnClick = this.handleCreateGameOnClick.bind(this);
    this.handleJoinGameOnClick = this.handleJoinGameOnClick.bind(this);
    this.handleSwitchDisplay = this.handleSwitchDisplay.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  componentDidMount() {
    this.socket.on('update player list', (players) => {
      this.setState({ players });
    });
  }

  toggleLogin() {
    const { login } = this.state;
    let status = login;

    if (login) status = false;
    else status = true;
    this.setState({ login: status });
  }

  handleUsernameInput(username) {
    this.setState({ username });
  }

  handleCreateGameOnClick() {
    this.setState({ role: 'moderator', login: true });
  }

  handleJoinGameOnClick() {
    this.setState({ role: 'player', login: true });
  }

  handleSwitchDisplay(display) {
    this.setState({ display });
  }

  render() {
    const {
      role,
      username,
      gameTimer,
      login,
      display,
      players,
    } = this.state;

    return (
      <div id="app-container">
        <div id="app-header">
          <h3>The Werewolf Game</h3>
        </div>

        {login ? (() => {
          switch (display) {
            case 'gameboard': return (
              <Gameboard
                role={role}
                username={username}
                players={players}
                socket={this.socket}
              />
            );
            case 'lobby': return (
              <Lobby
                toggleLogin={this.toggleLogin}
                username={username}
                role={role}
                handleSwitchDisplay={this.handleSwitchDisplay}
                players={players}
                socket={this.socket}
              />
            );
            default: return 'Loading...';
          }
        })() : (
          <Login
            username={username}
            handleCreateGameOnClick={this.handleCreateGameOnClick}
            handleUsernameInput={this.handleUsernameInput}
            handleJoinGameOnClick={this.handleJoinGameOnClick}
            socket={this.socket}
          />
        )}
        {/* <gameTimer gameTimer={gameTimer} /> */}
      </div>
    );
  }
}
