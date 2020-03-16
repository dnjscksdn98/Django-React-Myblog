import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useAuth0 } from "../auth/react-auth0-spa";

import Profile from "../components/Profile";
import { getUserProfile } from "../modules/userProfile";

function ProfileContainer() {
  const { loading, userProfile, error } = useSelector(
    state => ({
      loading: state.userProfile.loading,
      userProfile: state.userProfile.userProfile,
      error: state.userProfile.error
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    async function dispatchGetUserProfile() {
      const token = await getTokenSilently();
      dispatch(getUserProfile(token));
    }

    dispatchGetUserProfile();
  }, [getTokenSilently, dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>There was an error.</h2>;
  if (!userProfile) return null;

  return <Profile />;
}

export default ProfileContainer;
