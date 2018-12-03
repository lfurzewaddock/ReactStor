import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import RuntimePage from "./containers/RuntimePage";

const route = (props) => {
  const { path } = props;
  return (
    <Route path={path} component={RuntimePage} />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
