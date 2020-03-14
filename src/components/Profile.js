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
        <br />
        <Link to="/profile/my-posts">My Posts</Link>
        <br />
        <Link to="/profile/my-reading-list">My Reading List</Link>
        <br />
      </div>
      <div>
        <img src={user.picture} alt="Profile" />

        <h2>Username : {user.nickname}</h2>
        <h2>Email : {user.email}</h2>
      </div>
    </React.Fragment>
  );
}

export default Profile;
