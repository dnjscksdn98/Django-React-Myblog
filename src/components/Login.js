import React from "react";

function Login(props) {
  const { username, password, handleChange, handleSubmit } = props;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="username"
          autoComplete="off"
        />
        <br />
        <input
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="password"
          type="password"
        />
        <br />
        <button type="submit">login</button>
      </form>
    </React.Fragment>
  );
}

export default Login;
