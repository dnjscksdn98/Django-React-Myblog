import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import HomeContainer from "./containers/HomeContainer";
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
    <PrivateRoute path="/blog/:blogId/update" component={BlogUpdateContainer} />
    <Route exact path="/blog/:blogId" component={BlogDetailContainer} />
    <Route path="/blog" component={BlogContainer} />
    <PrivateRoute
      path="/profile/my-reading-list"
      component={ReadingListContainer}
    />
    <PrivateRoute path="/profile/my-posts" component={MyBlogContainer} />
    <PrivateRoute path="/profile/create-post" component={BlogCreateContainer} />
    <PrivateRoute exact path="/profile" component={ProfileContainer} />
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
