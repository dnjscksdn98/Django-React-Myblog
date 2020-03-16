import axios from "axios";

const GET_USER_PROFILE_START = "userProfile/GET_USER_PROFILE_START";
const GET_USER_PROFILE_SUCCESS = "userProfile/GET_USER_PROFILE_SUCCESS";
const GET_USER_PROFILE_FAIL = "userProfile/GET_USER_PROFILE_FAIL";

export const start = () => ({
  type: GET_USER_PROFILE_START
});

export const success = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  userProfile
});

export const fail = error => ({
  type: GET_USER_PROFILE_FAIL,
  error
});

export const getUserProfile = token => dispatch => {
  dispatch(start());

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  authAxios
    .get(`http://127.0.0.1:8000/api/users/id/`)
    .then(res => {
      authAxios
        .get(`http://127.0.0.1:8000/api/users/${res.data.user_id}/profile/`)
        .then(res => {
          dispatch(success(res.data));
        })
        .catch(err => {
          dispatch(fail(err));
        });
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  userProfile: null,
  error: null
};

export default function userProfile(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE_START:
      return {
        loading: true,
        userProfile: null,
        error: null
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        loading: false,
        userProfile: action.userProfile,
        error: null
      };

    case GET_USER_PROFILE_FAIL:
      return {
        loading: false,
        userProfile: null,
        error: action.error
      };

    default:
      return state;
  }
}
