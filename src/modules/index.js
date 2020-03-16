import { combineReducers } from "redux";

import auth from "./auth";
import posts from "./posts";
import post from "./post";
import comment from "./comment";
import create from "./createPost";
import categories from "./categories";
import myPosts from "./myPosts";
import readingList from "./readingList";
import updatePost from "./updatePost";
import deletePost from "./deletePost";
import userProfile from "./userProfile";
import userId from "./userId";

const rootReducer = combineReducers({
  auth,
  posts,
  post,
  comment,
  create,
  categories,
  myPosts,
  readingList,
  updatePost,
  deletePost,
  userProfile,
  userId
});

export default rootReducer;
