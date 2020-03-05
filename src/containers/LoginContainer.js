import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Login from "../components/Login";
import { login } from "../modules/auth";

function LoginContainer() {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const { username, password } = inputs;

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <React.Fragment>
      {isAuthenticated && <Redirect to="/" />}
      <Login
        username={username}
        password={password}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}

export default LoginContainer;
