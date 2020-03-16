import axios from "axios";

const DELETE_START = "deletePost/DELETE_START";
const DELETE_SUCCESS = "deletePost/DELETE_SUCCESS";
const DELETE_FAIL = "deletePost/DELETE_FAIL";

export const start = () => ({
  type: DELETE_START
});

export const success = () => ({
  type: DELETE_SUCCESS
});

export const fail = error => ({
  type: DELETE_FAIL,
  error
});

export const deleteMyPost = (deleteId, token) => dispatch => {
  dispatch(start());

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  authAxios
    .delete(`http://127.0.0.1:8000/api/post/${deleteId}/delete/`)
    .then(res => {
      dispatch(success());
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  error: null
};

export default function deletePost(state = initialState, action) {
  switch (action.type) {
    case DELETE_START:
      return {
        loading: start,
        error: null
      };

    case DELETE_SUCCESS:
      return {
        loading: false,
        error: null
      };

    case DELETE_FAIL:
      return {
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
