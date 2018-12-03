import React from "react";
import { Security } from "@okta/okta-react";
import { Switch } from "react-router-dom";

import Layout from "../../../common/layout/containers/Layout";
import Home from "../../home";
import Category from "../../category";
import Login from "../../login";
import Register from "../../register";
import Profile from "../../profile";
import Checkout from "../../checkout";
import Product from "../../product";
import ImplicitCallback from "../../implicit/callback";
import Runtime from "../../runtime";

import config from "../../../app-config";

// If user not authenticated, by default @okta/okta-react will redirect to Okta’s login page.
// Redirect to the custom login page instead
function onAuthRequired({ history }) {
  history.push("/login");
}

const routes = (
  <Switch>
    <Login path="/login" />
    <Register path="/register" />
    <Profile path="/profile" />
    <Checkout path="/checkout" />
    <Category path="/category/:id" />
    <Category path="/category" />
    <Product path="/product/:id" />
    <ImplicitCallback path="/implicit/callback" />
    <Runtime path="/:runtime" />
    <Home path="/" />
  </Switch>
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
