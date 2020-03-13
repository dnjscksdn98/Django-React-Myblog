import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useAuth0 } from "../react-auth0-spa";

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

  useEffect(() => {
    async function dispatchGetMyPosts() {
      const token = await getTokenSilently();
      dispatch(getMyPosts(token));
    }
    dispatchGetMyPosts();
  }, [dispatch, getTokenSilently]);

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
