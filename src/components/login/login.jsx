import React from 'react';

const Login = ({
  username,
  handleUsernameInput,
  handleStartOnClick,
}) => {
  const usernameInput = (e) => {
    handleUsernameInput(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    handleStartOnClick();
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
      </form>
    </div>
  );
};

export default Login;
