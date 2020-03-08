import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Blog from "../components/Blog";
import { getPosts } from "../modules/posts";

function BlogContainer() {
  const { loading, posts, error } = useSelector(
    state => ({
      loading: state.posts.loading,
      posts: state.posts.posts,
      error: state.posts.error
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error</h2>;
  if (!posts) return <h2>There is no posts.</h2>;

  return <Blog posts={posts} />;
}

export default React.memo(BlogContainer);
