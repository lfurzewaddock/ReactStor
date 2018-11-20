import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
// import { connect } from "react-redux";

import StripeScriptLoader from "../components/StripeScriptLoader";

// import * as actionsAuth from "../../../modules/users/actions/auth";

class Checkout extends Component {
  state = { authenticated: null };

  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  checkAuthentication = async () => {
    // const { auth, isAuthApiCall } = this.props;
    // isAuthApiCall(auth);

    const { auth } = this.props;
    const { authenticated } = this.state;
    const isAuthenticated = await auth.isAuthenticated();
    if (isAuthenticated !== authenticated) {
      this.setState({ authenticated: isAuthenticated });
    }
  }

  render() {
    const { authenticated } = this.state;
    // debugger; /* eslint-disable-line no-debugger */
    if (authenticated === null) return null;
    return !authenticated
      ? <Redirect to={{ pathname: "/login" }} />
      : (
        <StripeScriptLoader />
      );
  }
}

// const mapStateToProps = state => ({
//   authenticated: state.auth.authenticated,
// });

// const mapDispatchToProps = dispatch => ({
//   isAuthApiCall: (auth) => {
//     dispatch(actionsAuth.isAuthApiCall(auth));
//   },
// });


// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuth(Login)));
export default withRouter(withAuth(Checkout));
