import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { ImplicitCallback } from "@okta/okta-react";

const route = (props) => {
  const { path } = props;
  return (
    <Route path={path} component={ImplicitCallback} />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
