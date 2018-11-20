import React from "react";
import { Route } from "react-router-dom";

import LoginPage from "./containers/LoginPage";

import config from "../../app-config";

const route = () => (
  <Route
    path="/login"
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

export default route;
