import React from "react";
import { Router } from "react-router-dom";
import { useAuth0 } from "./auth/react-auth0-spa";

import BaseRouter from "./routes";
import NavBar from "./components/NavBar";
import history from "./utils/history";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Router history={history}>
      <header>
        <NavBar />
      </header>

      <BaseRouter />
    </Router>
  );
}

export default App;
