import React from "react";
import { useSelector } from "react-redux";

import Home from "../components/Home";

function HomeContainer() {
  const { isAuthenticated } = useSelector(state => state.auth.token !== null);

  return <Home isAuthenticated={isAuthenticated} />;
}

export default HomeContainer;
