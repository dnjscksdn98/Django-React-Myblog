import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

function Profile() {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div>
        <Link to="/profile/create-post">Create Post</Link>

        <Link to="/profile/my-posts">My Posts</Link>

        <Link to="/profile/my-reading-list">My Reading List</Link>
      </div>
      <div>
        <img src={user.picture} alt="Profile" />

        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <code>{JSON.stringify(user, null, 2)}</code>
      </div>
    </React.Fragment>
  );
}

export default Profile;
