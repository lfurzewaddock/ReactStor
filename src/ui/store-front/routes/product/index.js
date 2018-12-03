import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import ProductPage from "./containers/ProductPage";

const route = (props) => {
  const { path } = props;
  return (
    <Route path={path} component={ProductPage} />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
