import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withAuth } from "@okta/okta-react";

import LoginForm from "./LoginForm";

class Login extends Component {
  state = { authenticated: null };

  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  // TODO: DRY move to module
  checkAuthentication = async () => {
    const { auth } = this.props;
    const { authenticated } = this.state;
    const isAuthenticated = await auth.isAuthenticated();
    if (isAuthenticated !== authenticated) {
      this.setState({ authenticated: isAuthenticated });
    }
  }

  render() {
    const { authenticated } = this.state;
    const { baseUrl } = this.props;
    if (authenticated === null) return null;
    return authenticated
      ? <Redirect to={{ pathname: "/profile" }} />
      : <LoginForm baseUrl={baseUrl} />;
  }
}

Login.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default withAuth(Login);
