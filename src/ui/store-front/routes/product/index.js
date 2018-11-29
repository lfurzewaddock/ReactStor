import React from "react";
import { Route } from "react-router-dom";

import ProductPage from "./containers/ProductPage";

const route = () => <Route path="/product/:id" component={ProductPage} />;

export default route;
