import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// auth0
import { Auth0Provider } from "./auth/react-auth0-spa";
import config from "./auth/auth_config.json";
import history from "./utils/history";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import rootReducer from "./modules/index";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

// A function that routes the user to the right place after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      audience={config.audience}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
