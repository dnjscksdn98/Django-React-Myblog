import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import MyBlog from "../components/MyBlog";
import { getMyPosts } from "../modules/myPosts";

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

  const handleDelete = id => {};

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error.</h2>;
  if (!posts) return <h2>You don't have any posts yet.</h2>;

  return (
    <MyBlog
      posts={posts}
      update={update}
      setUpdate={setUpdate}
      updatePost={updatePost}
      updateId={updateId}
      handleUpdate={handleUpdate}
    />
  );
}

export default MyBlogContainer;
