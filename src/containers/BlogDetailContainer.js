import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";

import { getPost } from "../modules/post";
import BlogDetail from "../components/BlogDetail";
import { addComment } from "../modules/comment";

function BlogDetailContainer({ match }) {
  const { blogId } = match.params;
  const { loading, post, error } = useSelector(
    state => ({
      loading: state.post.loading,
      post: state.post.post,
      error: state.post.error
    }),
    shallowEqual
  );
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // if (isAuthenticated) {
    //   dispatch(addComment(comment, blogId));
    // } else {
    //   return <Redirect to="/login" />;
    // }
    dispatch(addComment(comment, blogId));

    setComment("");
  };

  useEffect(() => {
    dispatch(getPost(blogId));
  }, [dispatch, blogId]);

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
