import axios from "axios";

const GET_CATEGORIES_START = "categories/GET_CATEGORIES_START";
const GET_CATEGORIES_SUCCESS = "categories/GET_CATEGORIES_SUCCESS";
const GET_CATEGORIES_FAIL = "categories/GET_CATEGORIES_FAIL";

export const start = () => ({
  type: GET_CATEGORIES_START
});

export const success = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  categories
});

export const fail = error => ({
  type: GET_CATEGORIES_FAIL,
  error
});

export const getCategories = token => dispatch => {
  dispatch(start());

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  authAxios
    .get("http://127.0.0.1:8000/api/retrieve-categories/")
    .then(res => {
      dispatch(success(res.data));
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  categories: null,
  error: null
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_START:
      return {
        loading: true,
        categories: null,
        error: null
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.categories,
        error: null
      };

    case GET_CATEGORIES_FAIL:
      return {
        loading: false,
        categories: null,
        error: action.error
      };

    default:
      return state;
  }
}
