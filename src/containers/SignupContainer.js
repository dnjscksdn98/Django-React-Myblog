import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Signup from "../components/Signup";
import signup from "../modules/auth";

function SignupContainer() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
  });
  const { username, email, password1, password2 } = inputs;

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
    dispatch(signup(username, email, password1, password2));
  };

  return (
    <Signup
      username={username}
      email={email}
      password1={password1}
      password2={password2}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default SignupContainer;
