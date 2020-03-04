import React from "react";

function Signup(props) {
  const {
    username,
    email,
    password1,
    password2,
    handleChange,
    handleSubmit
  } = props;

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
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="email"
          autoComplete="off"
        />
        <br />
        <input
          name="password1"
          value={password1}
          onChange={handleChange}
          placeholder="password"
          type="password"
        />
        <br />
        <input
          name="password2"
          value={password2}
          onChange={handleChange}
          placeholder="confirm password"
          type="password"
        />
        <br />
        <button type="submit">signup</button>
      </form>
    </React.Fragment>
  );
}

export default Signup;
