import React from "react";
import { Security } from "@okta/okta-react";

import Layout from "../../../common/layout/containers/Layout";
import Home from "../../home";
import Category from "../../category";
import Login from "../../login";
import Register from "../../register";
import Profile from "../../profile";
import Checkout from "../../checkout";
import Product from "../../product";
import ImplicitCallback from "../../implicit/callback";

import config from "../../../app-config";

// If user not authenticated, by default @okta/okta-react will redirect to Okta’s login page.
// Redirect to the custom login page instead
function onAuthRequired({ history }) {
  history.push("/login");
}

const routes = (
  <>
    <Login />
    <ImplicitCallback />
    <Register />
    <Profile />
    <Checkout />
    <Category />
    <Product />
    <Home />
  </>
);

const app = () => (
  <Security
    issuer={config.oidcIdp.issuer}
    client_id={config.oidcIdp.clientId}
    redirect_uri={config.oidcIdp.redirectUri}
    onAuthRequired={onAuthRequired}
  >
    <Layout>
      {routes}
    </Layout>
  </Security>
);

export default app;
