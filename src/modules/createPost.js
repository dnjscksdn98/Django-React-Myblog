import axios from "axios";

const CREATE_START = "createPost/CREATE_START";
const CREATE_SUCCESS = "createPost/CREATE_SUCCESS";
const CREATE_FAIL = "createPost/CREATE_FAIL";

export const createStart = () => {
  return {
    type: CREATE_START
  };
};

export const createSuccess = blogId => {
  return {
    type: CREATE_SUCCESS,
    blogId
  };
};

export const createFail = error => {
  return {
    type: CREATE_FAIL,
    error
  };
};

export const createPost = (formData, selectedCategories, token) => dispatch => {
  dispatch(createStart());

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  authAxios
    .post("http://127.0.0.1:8000/api/post-create/", {
      formData,
      selectedCategories
    })
    .then(res => {
      dispatch(createSuccess(res.data.id));
    })
    .catch(err => {
      dispatch(createFail(err));
    });
};

const initialState = {
  loading: false,
  blogId: null,
  error: null
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case CREATE_START:
      return {
        loading: true,
        blogId: null,
        error: null
      };

    case CREATE_SUCCESS:
      return {
        loading: false,
        blogId: action.blogId,
        error: null
      };

    case CREATE_FAIL:
      return {
        loading: false,
        blodId: null,
        error: action.error
      };

    default:
      return state;
  }
}
