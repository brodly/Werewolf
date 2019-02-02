import React from 'react';
import io from 'socket.io-client';

const Login = ({
  username,
  handleUpdateUsername,
  handleCreateGameOnClick,
  handleJoinGameOnClick,
}) => {
  const socket = io();

  const updateUsername = (e) => {
    handleUpdateUsername(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();

    if (e.target.value === 'join') {
      handleJoinGameOnClick();
    } else if (e.target.value === 'create') {
      socket.emit('new game', username);
      handleCreateGameOnClick();
    }
  };

  return (
    <div id="login-container">
      <form id="login">
        <div id="login-header">
          Login
        </div>
        <label>
          Name:
          <input type="text" value={username} onChange={updateUsername} />
        </label>
        <p />
        <button id="login" type="submit" value="join" onClick={onClick}>Join Game</button>
        <button id="login" type="submit" value="create" onClick={onClick}>Create Game</button>
      </form>
    </div>
  );
};

export default Login;
