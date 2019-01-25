import React from 'react';

const Login = ({
  username,
  handleUpdateUsername,
  handleOnLoginSubmit
}) => {
  const updateUsername = (e) => {
    handleUpdateUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleOnLoginSubmit(e);
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
