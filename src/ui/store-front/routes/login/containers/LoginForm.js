import React, { Component } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import PropTypes from "prop-types";

class LoginForm extends Component {
  state = {
    sessionToken: null,
    error: null,
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { baseUrl } = this.props;
    const oktaAuth = new OktaAuth({ url: baseUrl });
    oktaAuth
      .signIn({
        username,
        password,
      })
      .then((res) => {
        // TODO: Testing - REMOVE
        // // eslint-disable-next-line no-debugger
        // debugger;
        this.setState({ sessionToken: res.sessionToken });
      })
      .catch((err) => {
        this.setState({ error: err.message });
        /* TODO: Replace with debug lib */
        console.log(`${err.statusCode} error`, err); /* eslint-disable-line no-console */
      });
  }

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  render() {
    const {
      username, password, sessionToken, error,
    } = this.state;
    const { auth } = this.props;

    if (sessionToken) {
      // TODO: Testing - REMOVE
      // // eslint-disable-next-line no-debugger
      // debugger;
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
};

export default withAuth(LoginForm);
