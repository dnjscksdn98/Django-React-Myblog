import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <React.Fragment>
      <ul>
        <li>
          <Link to="/profile/create">Create Post</Link>
        </li>
        <li>
          <Link to="/profile/posts">My Posts</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Profile;
