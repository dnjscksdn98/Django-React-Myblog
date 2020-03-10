import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BaseRouter from "./routes";
import LayoutContainer from "./containers/LayoutContainer";
import { checkState } from "./modules/auth";

function App() {
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkState());
  }, [dispatch]);

  return (
    <Router>
      <LayoutContainer isAuthenticated={isAuthenticated}>
        <BaseRouter />
      </LayoutContainer>
    </Router>
  );
}

export default App;
