import { combineReducers } from "redux";

import auth from "./auth";
import posts from "./posts";
import post from "./post";
import comment from "./comment";
import create from "./createPost";
import categories from "./categories";

const rootReducer = combineReducers({
  auth,
  posts,
  post,
  comment,
  create,
  categories
});

export default rootReducer;
