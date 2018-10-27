import React from "react";
import { Route } from "react-router-dom";

import Categories from "./components/Categories";

const route = () => <Route path="/categories" component={Categories} />;

export default route;
