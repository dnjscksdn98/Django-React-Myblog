import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import SignupContainer from "./containers/SignupContainer";
import LogoutContainer from "./containers/LogoutContainer";
import ProfileContainer from "./containers/ProfileContainer";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/profile" component={ProfileContainer} />
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
