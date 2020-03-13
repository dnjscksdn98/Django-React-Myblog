import axios from "axios";

const GET_POST_START = "post/GET_POST_START";
const GET_POST_SUCCESS = "post/GET_POST_SUCCESS";
const GET_POST_FAIL = "post/GET_POST_FAIL";

export const start = () => {
  return {
    type: GET_POST_START
  };
};

export const success = post => {
  return {
    type: GET_POST_SUCCESS,
    post
  };
};

export const fail = error => {
  return {
    type: GET_POST_FAIL,
    error
  };
};

export const getPost = (id, token) => dispatch => {
  dispatch(start());

  if (token) {
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    authAxios
      .get(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then(res => {
        dispatch(success(res.data));
      })
      .catch(err => {
        dispatch(fail(err));
      });
  } else {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then(res => {
        dispatch(success(res.data));
      })
      .catch(err => {
        dispatch(fail(err));
      });
  }
};

const initialState = {
  loading: false,
  post: null,
  error: null
};

export default function post(state = initialState, action) {
  switch (action.type) {
    case GET_POST_START:
      return {
        loading: true,
        post: null,
        error: null
      };

    case GET_POST_SUCCESS:
      return {
        loading: false,
        post: action.post,
        error: null
      };

    case GET_POST_FAIL:
      return {
        loading: false,
        post: null,
        error: action.error
      };

    default:
      return state;
  }
}
