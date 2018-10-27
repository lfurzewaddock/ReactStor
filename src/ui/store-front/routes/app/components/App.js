import React from "react";

import Layout from "../../../common/layout/containers/Layout";
import Home from "../../home";
import Categories from "../../categories";

const routes = (
  <>
    <Home />
    <Categories />
  </>
);

const app = () => (
  <Layout>
    {routes}
  </Layout>
);

export default app;
