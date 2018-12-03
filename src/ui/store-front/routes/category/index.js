import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import CategoryPage from "./containers/CategoryPage";

const route = (props) => {
  const { path } = props;
  return (
    <Route path={path} component={CategoryPage} />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
