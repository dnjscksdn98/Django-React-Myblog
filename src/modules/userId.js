import axios from "axios";

const GET_USER_ID_START = "userId/GET_USER_ID_START";
const GET_USER_ID_SUCCESS = "userId/GET_USER_ID_SUCCESS";
const GET_USER_ID_FAIL = "userId/GET_USER_ID_FAIL";

export const start = () => ({
  type: GET_USER_ID_START
});

export const success = userId => ({
  type: GET_USER_ID_SUCCESS,
  userId
});

export const fail = error => ({
  type: GET_USER_ID_FAIL,
  error
});

export const getUserId = token => dispatch => {
  dispatch(start());

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  authAxios
    .get(`http://127.0.0.1:8000/api/users/id/`)
    .then(res => {
      dispatch(success(res.data));
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  userId: null,
  error: null
};

export default function userId(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ID_START:
      return {
        loading: true,
        userId: null,
        error: null
      };

    case GET_USER_ID_SUCCESS:
      return {
        loading: false,
        userId: action.userId,
        error: null
      };

    case GET_USER_ID_FAIL:
      return {
        loading: false,
        userId: null,
        error: action.error
      };

    default:
      return state;
  }
}
