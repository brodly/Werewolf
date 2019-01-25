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
      timer: 5,
      nightTime: false,
    };

    this.handleUpdateUsername = this.handleUpdateUsername.bind(this);
    this.handleOnLoginSubmit = this.handleOnLoginSubmit.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    const { login } = this.state;
    let newLogin = login;

    if (login) newLogin = false;
    else newLogin = true;
    this.setState({ login: newLogin });
  }

  handleOnLoginSubmit() {
    this.setState({ role: 'moderator', login: true });
  }

  handleUpdateUsername(username) {
    this.setState({ username });
  }

  render() {
    const {
      role,
      username,
      timer,
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
              handleOnLoginSubmit={this.handleOnLoginSubmit}
              handleUpdateUsername={this.handleUpdateUsername}
            />
          ) : (
            <Lobby
              toggleLogin={this.toggleLogin}
              username={username}
              role={role}
            />
          )
        }

        {/* <Timer timer={timer} /> */}
        {/* <Admin /> */}
      </div>
    );
  }
}
