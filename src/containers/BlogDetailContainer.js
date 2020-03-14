import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useAuth0 } from "../react-auth0-spa";

import { getPost } from "../modules/post";
import BlogDetail from "../components/BlogDetail";
import { addComment } from "../modules/comment";

function BlogDetailContainer({ match }) {
  const { getTokenSilently, isAuthenticated } = useAuth0();

  const { blogId } = match.params;
  const { loading, post, error } = useSelector(
    state => ({
      loading: state.post.loading,
      post: state.post.post,
      error: state.post.error
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const token = await getTokenSilently();
    dispatch(addComment(comment, blogId, token));
    setComment("");
    dispatch(getPost(blogId, token));
  };

  useEffect(() => {
    async function dispatchGetPost(blogId) {
      const token = await getTokenSilently();
      dispatch(getPost(blogId, token));
    }

    if (isAuthenticated) {
      dispatchGetPost(blogId);
    } else {
      dispatch(getPost(blogId));
    }
  }, [isAuthenticated, getTokenSilently, dispatch, blogId]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error</h2>;
  if (!post) return null;

  return (
    <BlogDetail
      post={post}
      handleChange={handleChange}
      comment={comment}
      handleSubmit={handleSubmit}
    />
  );
}

export default BlogDetailContainer;
