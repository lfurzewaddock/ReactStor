import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import App from "./app/components/App";

const routes = () => (
  <Router>
    <App />
  </Router>
);

export default routes;
