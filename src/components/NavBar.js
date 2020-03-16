import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../auth/react-auth0-spa";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <React.Fragment>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      <Link to="/">Home</Link>&nbsp;
      <Link to="/blog">Blog</Link>
      {isAuthenticated && <Link to="/profile">Profile</Link>}
    </React.Fragment>
  );
};

export default NavBar;
