import React, { Component } from "react";
import PropTypes from "prop-types";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";

import config from "../../../app-config";

class RegistrationForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    sessionToken: null,
    error: null,
  };

  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const oktaAuth = new OktaAuth({ url: config.oidcIdp.url });
    const { email, password } = this.state;
    // Set redirect path as 'secureRouterReferrerPath' in local storage for
    // ImplicitCallback to avoid default redirect to root '/' path
    localStorage.setItem("secureRouterReferrerPath", JSON.stringify({ pathname: "/profile", search: "", hash: "" }));
    fetch(`${config.api.baseUrl}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(() => {
        oktaAuth
          .signIn({
            username: email,
            password,
          })
          .then((res) => {
            // TODO: Testing - REMOVE
            // eslint-disable-next-line no-debugger
            // debugger;
            this.setState({ sessionToken: res.sessionToken });
          })
          .catch((err) => {
            this.setState({ error: err.message });
            /* TODO: Replace with debug lib */
            console.log("Fetch inner error: ", err); /* eslint-disable-line no-console */
          });
      })
      .catch((err) => {
        this.setState({ error: err.message });
        /* TODO: Replace with debug lib */
        console.log("Fetch outer error: ", err); /* eslint-disable-line no-console */
      });
  }

  checkAuthentication = async () => {
    const { auth } = this.props;
    const sessionToken = await auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  render() {
    const { sessionToken } = this.state;
    const { auth } = this.props;
    if (sessionToken) {
      auth.redirect({ sessionToken });
      return null;
    }

    const {
      email, firstName, lastName, password, error,
    } = this.state;

    const errorMessage = error ? (
      <span className="error-message">{error}</span>
    ) : null;

    return (
      <form onSubmit={this.handleSubmit}>
        {errorMessage}
        <fieldset className="form-element">
          <legend>Email:</legend>
          <input
            type="email"
            id="email"
            value={email}
            onChange={this.handleInputChange("email")}
          />
        </fieldset>
        <fieldset className="form-element">
          <legend>First Name:</legend>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={this.handleInputChange("firstName")}
          />
        </fieldset>
        <fieldset className="form-element">
          <legend>Last Name:</legend>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={this.handleInputChange("lastName")}
          />
        </fieldset>
        <fieldset className="form-element">
          <legend>Password:</legend>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleInputChange("password")}
          />
        </fieldset>
        <input type="submit" id="submit" value="Register" />
      </form>
    );
  }
}

RegistrationForm.propTypes = {
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

export default withAuth(RegistrationForm);
