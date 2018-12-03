import React from "react";
import PropTypes from "prop-types";
import { SecureRoute } from "@okta/okta-react";

import Profile from "./containers/Profile";

const route = (props) => {
  const { path } = props;
  return (
    <SecureRoute path={path} component={Profile} />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
