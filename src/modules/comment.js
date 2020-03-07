import { authAxios } from "./utils";

const ADD_COMMENT_START = "comment/ADD_COMMENT_START";
const ADD_COMMENT_SUCCESS = "comment/ADD_COMMENT_SUCCESS";
const ADD_COMMENT_FAIL = "comment/ADD_COMMENT_FAIL";

export const start = () => {
  return {
    type: ADD_COMMENT_START
  };
};

export const success = comment => {
  return {
    type: ADD_COMMENT_SUCCESS,
    comment
  };
};

export const fail = error => {
  return {
    type: ADD_COMMENT_FAIL,
    error
  };
};

export const addComment = (comment, blogId) => async dispatch => {
  dispatch(start());

  // try {
  //   await authAxios.post("http://127.0.0.1:8000/api/add-comment/", {comment, blogId})
  //   dispatch(success(comment));
  // } catch(err) {
  //   dispatch(fail(err));
  // }

  await authAxios
    .post("http://127.0.0.1:8000/api/add-comment/", {
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
