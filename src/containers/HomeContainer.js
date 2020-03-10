import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "../components/Home";
import { checkState } from "../modules/auth";

function HomeContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkState());
  });

  return <Home />;
}

export default HomeContainer;
