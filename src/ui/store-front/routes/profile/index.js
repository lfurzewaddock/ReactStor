import React from "react";
import { SecureRoute } from "@okta/okta-react";

import Profile from "./containers/Profile";

const route = () => <SecureRoute path="/profile" component={Profile} />;

export default route;
