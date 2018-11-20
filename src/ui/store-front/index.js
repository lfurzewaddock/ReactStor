import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

// import "sanitize.css";
import "../../assets/styles/semantic-ui-theme";
import "./index.css";

import Routes from "./routes";
import reducers from "./modules/reducers";

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(
  reducers, composeEnhancers(applyMiddleware(logger, thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root") || document.createElement("div"),
);
