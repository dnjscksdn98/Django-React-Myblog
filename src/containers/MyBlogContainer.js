import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import MyBlog from "../components/MyBlog";
import { getMyPosts } from "../modules/myPosts";
import { deleteMyPost } from "../modules/deletePost";

function MyBlogContainer() {
  const { loading, posts, error } = useSelector(
    state => ({
      loading: state.myPosts.loading,
      posts: state.myPosts.posts,
      error: state.myPosts.error
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [update, setUpdate] = useState(false);
  const [updatePost, setUpdatePost] = useState(null);
  const [updateId, setUpdateId] = useState("");

  const handleUpdate = (post, id) => {
    setUpdate(!update);
    setUpdatePost(post);
    setUpdateId(id);
  };

  const handleDelete = id => {
    dispatch(deleteMyPost(id));
  };

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (!posts) return null;
  if (error) return <h2>There was an error.</h2>;

  return (
    <MyBlog
      posts={posts}
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
