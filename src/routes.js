import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import SignupContainer from "./containers/SignupContainer";
import LogoutContainer from "./containers/LogoutContainer";
import ProfileContainer from "./containers/ProfileContainer";
import BlogContainer from "./containers/BlogContainer";
import BlogDetailContainer from "./containers/BlogDetailContainer";
import BlogCreateContainer from "./containers/BlogCreateContainer";
import MyBlogContainer from "./containers/MyBlogContainer";
import BlogUpdateContainer from "./containers/BlogUpdateContainer";
import ReadingListContainer from "./containers/ReadingListContainer";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/blog/:blogId/update" component={BlogUpdateContainer} />
    <Route exact path="/blog/:blogId" component={BlogDetailContainer} />
    <Route path="/blog" component={BlogContainer} />
    <Route path="/profile/my-reading-list" component={ReadingListContainer} />
    <Route path="/profile/my-posts" component={MyBlogContainer} />
    <Route path="/profile/create-post" component={BlogCreateContainer} />
    <Route exact path="/profile" component={ProfileContainer} />
    <Route path="/logout" component={LogoutContainer} />
    <Route path="/login" component={LoginContainer} />
    <Route path="/signup" component={SignupContainer} />
    <Route
      render={({ location }) => (
        <React.Fragment>
          <h1>이 페이지는 존재하지 않습니다.</h1>
        </React.Fragment>
      )}
    />
  </Switch>
);

export default BaseRouter;
