import { combineReducers } from "redux";

import auth from "./auth";
import posts from "./posts";
import post from "./post";
import comment from "./comment";

const rootReducer = combineReducers({
  auth,
  posts,
  post,
  comment
});

export default rootReducer;
