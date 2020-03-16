import axios from "axios";

const ADD_COMMENT_START = "comment/ADD_COMMENT_START";
const ADD_COMMENT_SUCCESS = "comment/ADD_COMMENT_SUCCESS";
const ADD_COMMENT_FAIL = "comment/ADD_COMMENT_FAIL";

export const start = () => ({
  type: ADD_COMMENT_START
});

export const success = comment => ({
  type: ADD_COMMENT_SUCCESS,
  comment
});

export const fail = error => ({
  type: ADD_COMMENT_FAIL,
  error
});

export const addComment = (comment, blogId, token) => dispatch => {
  dispatch(start());

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  authAxios
    .post("http://localhost:8000/api/add-comment/", {
      comment,
      blogId
    })
    .then(res => {
      dispatch(success(comment));
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  comment: null,
  error: null
};

export default function comment(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT_START:
      return {
        loading: true,
        comment: null,
        error: null
      };

    case ADD_COMMENT_SUCCESS:
      return {
        loading: false,
        comment: action.comment,
        error: null
      };

    case ADD_COMMENT_FAIL:
      return {
        loading: false,
        comment: null,
        error: action.error
      };

    default:
      return state;
  }
}
