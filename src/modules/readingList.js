import axios from "axios";

const GET_READING_LIST_START = "readingList/GET_READING_LIST_START";
const GET_READING_LIST_SUCCESS = "readingList/GET_READING_LIST_SUCCESS";
const GET_READING_LIST_FAIL = "readingList/GET_READING_LIST_FAIL";

export const start = () => ({
  type: GET_READING_LIST_START
});

export const success = posts => ({
  type: GET_READING_LIST_SUCCESS,
  posts
});

export const fail = error => ({
  type: GET_READING_LIST_FAIL,
  error
});

export const getReadingList = token => dispatch => {
  dispatch(start());

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  authAxios
    .get("http://127.0.0.1:8000/api/my-reading-list/")
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
