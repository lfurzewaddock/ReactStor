import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import LoginPage from "./containers/LoginPage";

import config from "../../app-config";

const route = (props) => {
  const { path } = props;
  return (
    <Route
      path={path}
      render={
        () => (
          <LoginPage
            baseUrl={config.oidcIdp.url}
            clientId={config.oidcIdp.clientId}
            scope={config.oidcIdp.scopes}
            responseType={config.oidcIdp.responseType}
            issuer={config.oidcIdp.issuer}
            redirectUri={`${window.location.origin}/login`}
          />)
      }
    />
  );
};

route.propTypes = {
  path: PropTypes.string.isRequired,
};

export default route;
