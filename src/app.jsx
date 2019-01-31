import React from 'react';
import Timer from './components/timer';
import Login from './components/login';
import Lobby from './components/lobby/lobby';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      login: false,
      username: '',
      role: '',
      gameTimer: 5,
      nightTime: false,
    };

    this.handleUpdateUsername = this.handleUpdateUsername.bind(this);
    this.handleCreateGameOnSubmit = this.handleCreateGameOnSubmit.bind(this);
    this.handleJoinGameOnSubmit = this.handleJoinGameOnSubmit.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    const { login } = this.state;
    let newLogin = login;

    if (login) newLogin = false;
    else newLogin = true;
    this.setState({ login: newLogin });
  }

  handleCreateGameOnSubmit() {
    this.setState({ role: 'moderator', login: true });
  }

  handleUpdateUsername(username) {
    this.setState({ username });
  }

  handleJoinGameOnSubmit() {
    this.setState({ role: 'player', login: true });
  }

  render() {
    const {
      role,
      username,
      gameTimer,
      nightTime,
      login,
    } = this.state;

    return (
      <div id="app-container">
        <div id="header">
          <h3>The Werewolf Game</h3>
        </div>

        {
          !login ? (
            <Login
              role={role}
              username={username}
              handleCreateGameOnSubmit={this.handleCreateGameOnSubmit}
              handleUpdateUsername={this.handleUpdateUsername}
              handleJoinGameOnSubmit={this.handleJoinGameOnSubmit}
            />
          ) : (
            <Lobby
              toggleLogin={this.toggleLogin}
              username={username}
              role={role}
            />
          )
        }

        {/* <gameTimer gameTimer={gameTimer} /> */}
      </div>
    );
  }
}
