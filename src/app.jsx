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
      type: '',
      timer: 5,
      nightTime: false,
    };

    this.handleUpdateUsername = this.handleUpdateUsername.bind(this);
    this.handleOnLoginSubmit = this.handleOnLoginSubmit.bind(this);
  }

  handleOnLoginSubmit() {
    this.setState({ type: 'moderator', login: true });
  }

  handleUpdateUsername(username) {
    this.setState({ username });
  }

  render() {
    const {
      type,
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
              type={type}
              username={username}
              handleOnLoginSubmit={this.handleOnLoginSubmit}
              handleUpdateUsername={this.handleUpdateUsername}
            />
          ) : (
            <Lobby
              username={username}
              type={type}
            />
          )
        }

        {/* <Timer timer={timer} /> */}
        {/* <Admin /> */}
      </div>
    );
  }
}
