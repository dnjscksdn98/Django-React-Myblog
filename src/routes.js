import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/login" component={LoginContainer} />
    <Route
      render={({ location }) => (
        <React.Fragment>
          <h1>이 페이지는 존재하지 않습니다.</h1>
          <p>{location.pathname}</p>
        </React.Fragment>
      )}
    />
  </Switch>
);

export default BaseRouter;
