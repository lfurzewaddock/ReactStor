import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";

import LoginForm from "./LoginForm";

import * as actionsAuth from "../../../modules/users/actions/auth";

class Login extends Component {
  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  checkAuthentication = () => {
    const { auth, isAuthApiCall } = this.props;
    isAuthApiCall(auth);
  }

  render() {
    const { baseUrl, authenticated } = this.props;
    if (authenticated === null) return null;
    return authenticated
      ? <Redirect to={{ pathname: "/profile" }} />
      : <LoginForm baseUrl={baseUrl} />;
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  isAuthApiCall: (auth) => {
    dispatch(actionsAuth.isAuthApiCall(auth));
  },
});

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
  authenticated: PropTypes.bool.isRequired,
  isAuthApiCall: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Login));
