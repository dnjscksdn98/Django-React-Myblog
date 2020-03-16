import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useAuth0 } from "../auth/react-auth0-spa";

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
  }, [getTokenSilently, dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error.</h2>;
  if (!posts) return null;

  return <ReadingList posts={posts} />;
}

export default ReadingListContainer;
