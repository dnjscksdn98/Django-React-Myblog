import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "../auth/react-auth0-spa";

import MyBlog from "../components/MyBlog";
import { deleteMyPost } from "../modules/deletePost";

function MyBlogContainer() {
  const userProfile = useSelector(state => state.userProfile.userProfile);
  const dispatch = useDispatch();

  const { getTokenSilently } = useAuth0();

  const [update, setUpdate] = useState(false);
  const [updatePost, setUpdatePost] = useState(null);
  const [updateId, setUpdateId] = useState("");

  const handleUpdate = (post, id) => {
    setUpdate(!update);
    setUpdatePost(post);
    setUpdateId(id);
  };

  const handleDelete = async id => {
    const token = await getTokenSilently();
    dispatch(deleteMyPost(id, token));
  };

  if (!userProfile.my_posts.length < 1) return null;

  return (
    <MyBlog
      userProfile={userProfile}
      update={update}
      setUpdate={setUpdate}
      updatePost={updatePost}
      updateId={updateId}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  );
}

export default MyBlogContainer;
