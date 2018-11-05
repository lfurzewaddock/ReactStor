import React from "react";
import { Route } from "react-router-dom";

import RegistrationForm from "./containers/RegistrationForm";

const route = () => <Route path="/register" component={RegistrationForm} />;

export default route;
