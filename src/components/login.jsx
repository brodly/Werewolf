import React from 'react';

const Login = ({
  username,
  handleUpdateUsername,
  handleCreateGameOnSubmit,
  handleJoinGameOnSubmit,
}) => {
  const updateUsername = (e) => {
    handleUpdateUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
    handleCreateGameOnSubmit(e);
  };

  return (
    <div id="login-container">
      <form onSubmit={onSubmit}>
        <div id="login-header">
          Login
        </div>
        <label>
          Name:
          <input type="text" value={username} onChange={updateUsername} />
        </label>
        <p />
        <input type="submit" value="Join Game" />
        <input type="submit" value="Create Game" />
      </form>
    </div>
  );
};

export default Login;
