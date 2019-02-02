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
    };

    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleCreateGameOnClick = this.handleCreateGameOnClick.bind(this);
    this.handleJoinGameOnClick = this.handleJoinGameOnClick.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
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
    this.setState({ role: null, login: true });
  }

  render() {
    const {
      role,
      username,
      gameTimer,
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
              handleCreateGameOnClick={this.handleCreateGameOnClick}
              handleUsernameInput={this.handleUsernameInput}
              handleJoinGameOnClick={this.handleJoinGameOnClick}
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
