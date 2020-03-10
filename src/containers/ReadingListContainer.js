import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import ReadingList from "../components/ReadingList";
import { getReadingList } from "../modules/readingList";

function ReadingListContainer() {
  const { loading, posts, error } = useSelector(
    state => ({
      loading: state.readingList.loading,
      posts: state.readingList.posts,
      error: state.readingList.error
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReadingList());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (!posts) return null;
  if (error) return <h2>There was an error.</h2>;

  return <ReadingList posts={posts} />;
}

export default ReadingListContainer;
