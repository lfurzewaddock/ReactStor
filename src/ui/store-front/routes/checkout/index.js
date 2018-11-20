import React from "react";
import { SecureRoute } from "@okta/okta-react";

import CheckoutPage from "./containers/CheckoutPage";

const route = () => <SecureRoute path="/checkout" component={CheckoutPage} />;

export default route;
