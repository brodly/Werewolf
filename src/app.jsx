/* eslint-disable no-multi-spaces */
import React from 'react';
import io from 'socket.io-client';

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
      players: [],
    };

    // INIT SOCKET
    this.socket                  = io();

    // METHOD BINDINGS
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleSwitchDisplay = this.handleSwitchDisplay.bind(this);
    this.handleStartOnClick  = this.handleStartOnClick.bind(this);
    this.toggleLogin         = this.toggleLogin.bind(this);
  }

  componentDidMount() {
    this.socket.on('update player list', (players) => {
      this.setState({ players });
    });

    this.socket.on('load lobby', (role) => {
      this.setState({ role, login: true });
    });
  }

  toggleLogin() {
    const { login } = this.state;
    let status      = login;

    if (login) status = false;
    else status = true;
    this.setState({ login: status });
  }

  handleUsernameInput(username) {
    this.setState({ username });
  }

  handleStartOnClick() {
    const { username } = this.state;
    this.socket.emit('client start', username);
  }

  handleSwitchDisplay(display) {
    this.setState({ display });
  }

  render() {
    const {
      role,
      username,
      login,
      display,
      players,
    } = this.state;

    return (
      <div id="app-container">
        <div id="app-header">
          The Werewolf Game
        </div>

        {login ? (() => {
          switch (display) {
            case 'gameboard': return (
              <Gameboard
                role={role}
                username={username}
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
            handleStartOnClick={this.handleStartOnClick}
            handleUsernameInput={this.handleUsernameInput}
          />
        )}
      </div>
    );
  }
}
