import React from "react";
import PropTypes from "prop-types";
import { SecureRoute } from "@okta/okta-react";

import CheckoutPage from "./containers/CheckoutPage";

const route = (props) => {
  const { path } = props;
  return (
    <SecureRoute path={path} component={CheckoutPage} />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
