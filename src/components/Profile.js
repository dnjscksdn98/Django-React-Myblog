import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <React.Fragment>
      <ul>
        <li>
          <Link to="/profile/create-post">Create Post</Link>
        </li>
        <li>
          <Link to="/profile/my-posts">My Posts</Link>
        </li>
        <li>
          <Link to="/profile/my-reading-list">My Reading List</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Profile;
