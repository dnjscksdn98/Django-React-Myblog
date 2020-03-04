import axios from "axios";

const AUTH_START = "auth/AUTH_START";
const AUTH_SUCCESS = "auth/AUTH_SUCCESS";
const AUTH_FAIL = "auth/AUTH_FAIL";
const AUTH_LOGOUT = "auth/AUTH_LOGOUT";

export const start = () => {
  return {
    type: AUTH_START
  };
};

export const success = token => {
  return {
    type: AUTH_SUCCESS,
    token
  };
};

export const fail = error => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT
  };
};

export const checkTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const login = (username, password) => {
  return dispatch => {
    dispatch(start());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(success(token));
        dispatch(checkTimeout(3600));
      })
      .catch(err => {
        dispatch(fail(err));
      });
  };
};

export const signup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(start());
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(success(token));
        dispatch(checkTimeout(3600));
      })
      .catch(err => {
        dispatch(fail(err));
      });
  };
};

export const checkState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(success(token));
        dispatch(
          checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

const initialState = {
  token: null,
  error: null,
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };

    case AUTH_SUCCESS:
      return {
        token: action.token,
        error: null,
        loading: false
      };

    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        token: null
      };

    default:
      return state;
  }
}
