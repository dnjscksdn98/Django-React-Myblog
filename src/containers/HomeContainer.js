import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Home from "../components/Home";
import { checkState } from "../modules/auth";

function HomeContainer() {
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => dispatch(checkState()));

  return <Home isAuthenticated={isAuthenticated} />;
}

export default HomeContainer;
