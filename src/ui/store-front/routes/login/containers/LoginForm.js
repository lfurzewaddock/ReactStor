import React, { Component } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actionsLogin from "../../../modules/users/actions/login";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    window.parent.postMessage("submitted form", "*");
    const { username, password } = this.state;
    const { baseUrl, loginApiCall } = this.props;
    const oktaAuth = new OktaAuth({ url: baseUrl });
    loginApiCall(oktaAuth, username, password);
  }

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  render() {
    const {
      username, password,
    } = this.state;
    const { auth, sessionToken, error } = this.props;

    if (sessionToken) {
      auth.redirect({ sessionToken });
      return null;
    }

    const errorMessage = error ? (
      <span className="error-message">{error}</span>
    ) : null;

    return (
      <form onSubmit={this.handleSubmit}>
        {errorMessage}
        <fieldset className="form-element">
          <legend>Username:</legend>
          <input
            id="username"
            type="text"
            value={username}
            onChange={this.handleInputChange("username")}
          />
        </fieldset>
        <fieldset className="form-element">
          <legend>Password:</legend>
          <input
            id="password"
            type="password"
            value={password}
            onChange={this.handleInputChange("password")}
          />
        </fieldset>
        <input id="submit" type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  sessionToken: state.login.sessionToken,
  error: state.login.error,
});

const mapDispatchToProps = dispatch => ({
  loginApiCall: (oktaAuth, username, password) => {
    dispatch(actionsLogin.loginApiCall(oktaAuth, username, password));
  },
});

LoginForm.propTypes = {
  baseUrl: PropTypes.string.isRequired,
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
  sessionToken: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loginApiCall: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withAuth(LoginForm));
