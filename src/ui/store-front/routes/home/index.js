import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import Home from "./components/Home";

const route = (props) => {
  const { path } = props;
  return (
    <Route path={path} exact component={Home} />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
