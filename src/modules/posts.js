import axios from "axios";

const GET_POSTS_START = "posts/GET_POSTS_START";
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS";
const GET_POSTS_FAIL = "posts/GET_POSTS_FAIL";

export const start = () => ({
  type: GET_POSTS_START
});

export const success = posts => ({
  type: GET_POSTS_SUCCESS,
  posts
});

export const fail = error => ({
  type: GET_POSTS_FAIL,
  error
});

export const getPosts = () => dispatch => {
  dispatch(start());

  axios
    .get("http://127.0.0.1:8000/api/posts/")
    .then(res => {
      dispatch(success(res.data));
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  posts: null,
  error: null
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_START:
      return {
        loading: true,
        posts: null,
        error: null
      };

    case GET_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.posts,
        error: null
      };

    case GET_POSTS_FAIL:
      return {
        loading: false,
        posts: null,
        error: action.error
      };

    default:
      return state;
  }
}
