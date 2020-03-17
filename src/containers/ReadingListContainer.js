import React from "react";
import { useSelector } from "react-redux";

import ReadingList from "../components/ReadingList";

function ReadingListContainer() {
  const userProfile = useSelector(state => state.userProfile.userProfile);

  if (!userProfile) return null;

  return <ReadingList userProfile={userProfile} />;
}

export default ReadingListContainer;
