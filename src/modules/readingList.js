import { authAxios } from "./utils";

const GET_READING_LIST_START = "readingList/GET_READING_LIST_START";
const GET_READING_LIST_SUCCESS = "readingList/GET_READING_LIST_SUCCESS";
const GET_READING_LIST_FAIL = "readingList/GET_READING_LIST_FAIL";

export const start = () => {
  return {
    type: GET_READING_LIST_START
  };
};

export const success = posts => {
  return {
    type: GET_READING_LIST_SUCCESS,
    posts
  };
};

export const fail = error => {
  return {
    type: GET_READING_LIST_FAIL,
    error
  };
};

export const getReadingList = () => async dispatch => {
  dispatch(start());

  try {
    const posts = await authAxios.get(
      "http://127.0.0.1:8000/api/my-reading-list/"
    );
    dispatch(success(posts.data));
  } catch (err) {
    dispatch(fail(err));
  }
};

const initialState = {
  loading: false,
  posts: null,
  error: null
};

export default function readingList(state = initialState, action) {
  switch (action.type) {
    case GET_READING_LIST_START:
      return {
        loading: true,
        posts: null,
        error: null
      };

    case GET_READING_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.posts,
        error: null
      };

    case GET_READING_LIST_FAIL:
      return {
        loading: false,
        posts: null,
        error: action.error
      };

    default:
      return state;
  }
}
