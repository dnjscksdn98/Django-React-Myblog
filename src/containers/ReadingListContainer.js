import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useAuth0 } from "../react-auth0-spa";

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

  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    async function dispatchGetReadingList() {
      const token = await getTokenSilently();
      dispatch(getReadingList(token));
    }
    dispatchGetReadingList();
  }, [dispatch, getTokenSilently]);

  if (loading) return <h2>Loading...</h2>;
  if (!posts) return null;
  if (error) return <h2>There was an error.</h2>;

  return <ReadingList posts={posts} />;
}

export default ReadingListContainer;
