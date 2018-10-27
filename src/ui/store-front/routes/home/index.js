import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";

const route = () => <Route path="/" exact component={Home} />;

export default route;
