import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
// import { connect } from "react-redux";

import LoginForm from "./LoginForm";

// import * as actionsAuth from "../../../modules/users/actions/auth";

class Login extends Component {
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
    const {
      baseUrl, clientId, scope, responseType, issuer, redirectUri,
    } = this.props;
    const { authenticated } = this.state;
    // debugger; /* eslint-disable-line no-debugger */
    if (authenticated === null) return null;
    return authenticated
      ? <Redirect to={{ pathname: "/profile" }} />
      : (
        <LoginForm
          baseUrl={baseUrl}
          clientId={clientId}
          scope={scope}
          responseType={responseType}
          issuer={issuer}
          redirectUri={redirectUri}
        />
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

Login.propTypes = {
  auth: PropTypes.shape({
    getAccessToken: PropTypes.func,
    getIdToken: PropTypes.func,
    getUser: PropTypes.func,
    handleAuthentication: PropTypes.func,
    isAuthenticated: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func,
    redirect: PropTypes.func,
  }).isRequired,
  baseUrl: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  scope: PropTypes.arrayOf(PropTypes.string),
  responseType: PropTypes.arrayOf(PropTypes.string),
  issuer: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired,
  // authenticated: PropTypes.bool.isRequired,
  // isAuthApiCall: PropTypes.func.isRequired,
};

Login.defaultProps = {
  responseType: ["id_token", "token"],
  scope: ["openid", "email", "profile"],
};


// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuth(Login)));
export default withRouter(withAuth(Login));
