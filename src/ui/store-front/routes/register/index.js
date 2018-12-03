import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import RegistrationForm from "./containers/RegistrationForm";

const route = (props) => {
  const { path } = props;
  return (
    <Route path={path} exact component={RegistrationForm} />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
