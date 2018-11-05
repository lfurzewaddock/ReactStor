import React from "react";
import { Route } from "react-router-dom";
import { ImplicitCallback } from "@okta/okta-react";

const route = () => <Route path="/implicit/callback" component={ImplicitCallback} />;

export default route;
