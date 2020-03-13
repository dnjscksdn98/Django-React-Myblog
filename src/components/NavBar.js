import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      <Link to="/">Home</Link>&nbsp;
      <Link to="/blog">Blog</Link>
      {isAuthenticated && <Link to="/profile">Profile</Link>}
    </div>
  );
};

export default NavBar;
