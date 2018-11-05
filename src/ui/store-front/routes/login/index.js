import React from "react";
import { Route } from "react-router-dom";

import LoginPage from "./containers/LoginPage";

import config from "../../app-config";

const route = () => <Route path="/login" render={() => <LoginPage baseUrl={config.oidcIdp.url} />} />;

export default route;
