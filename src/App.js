import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";

import BaseRouter from "./routes";
import NavBar from "./components/NavBar";
import history from "./utils/history";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
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
