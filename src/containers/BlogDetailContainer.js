import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useAuth0 } from "../auth/react-auth0-spa";

import BlogDetail from "../components/BlogDetail";
import { getPost } from "../modules/post";
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
    setComment("");
    dispatch(addComment(comment, blogId, token));
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
  }, [getTokenSilently, dispatch, blogId, isAuthenticated]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error</h2>;
  if (!post) return null;

  return (
    <BlogDetail
      post={post}
      comment={comment}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default BlogDetailContainer;
