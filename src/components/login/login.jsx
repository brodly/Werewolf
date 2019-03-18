import React from 'react';

const Login = ({
  username,
  handleUsernameInput,
  // handleCreateGameOnClick,
  // handleJoinGameOnClick,
  handleStartOnClick,
  socket,
}) => {
  const usernameInput = (e) => {
    handleUsernameInput(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();

    handleStartOnClick();

    // if (e.target.value === 'join') {
    //   handleJoinGameOnClick();
    // } else if (e.target.value === 'create') {
    //   socket.emit('new game', username);
    //   handleCreateGameOnClick();
    // }
  };

  return (
    <div id="login-container">
      <form id="login">
        <div id="login-header">
          Login
        </div>
        <label>
          Name:
          <input type="text" value={username} onChange={usernameInput} />
        </label>
        <p />
        <button id="login" type="submit" value="join" onClick={onClick}>Start</button>
        {/* <button id="login" type="submit" value="create" onClick={onClick}>Create Game</button> */}
      </form>
    </div>
  );
};

export default Login;
