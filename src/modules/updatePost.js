import { authAxios } from "./utils";

const UPDATE_START = "updatePost/UPDATE_START";
const UPDATE_SUCCESS = "updatePost/UPDATE_SUCCESS";
const UPDATE_FAIL = "updatePost/UPDATE_FAIL";

export const start = () => {
  return {
    type: UPDATE_START
  };
};

export const success = blogId => {
  return {
    type: UPDATE_SUCCESS,
    blogId
  };
};

export const fail = error => {
  return {
    type: UPDATE_FAIL,
    error
  };
};

export const updateMyPost = (
  formData,
  updateId,
  selectedCategories
) => async dispatch => {
  dispatch(start());

  await authAxios
    .put(`http://127.0.0.1:8000/api/post/${updateId}/update/`, {
      formData,
      updateId,
      selectedCategories
    })
    .then(res => {
      dispatch(success(res.data.id));
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  blogId: null,
  error: null
};

export default function updatePost(state = initialState, action) {
  switch (action.type) {
    case UPDATE_START:
      return {
        loading: true,
        blogId: null,
        error: null
      };

    case UPDATE_SUCCESS:
      return {
        loading: false,
        blogId: action.blogId,
        error: null
      };

    case UPDATE_FAIL:
      return {
        loading: false,
        blodId: null,
        error: action.error
      };

    default:
      return state;
  }
}
