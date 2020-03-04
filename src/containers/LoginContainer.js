import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Login from "../components/Login";
import { login } from "../modules/auth";

function LoginContainer() {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const { username, password } = inputs;

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
    <Login
      username={username}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default LoginContainer;
