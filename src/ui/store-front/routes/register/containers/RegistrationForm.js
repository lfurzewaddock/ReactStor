import React, { Component } from "react";
import PropTypes from "prop-types";
import OktaAuth from "@okta/okta-auth-js";
// import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Button, Form, Grid, Header, Image, Message, Segment,
} from "semantic-ui-react";

import config from "../../../app-config";

import * as actionsLogin from "../../../modules/users/actions/login";
import * as actionsRegister from "../../../modules/users/actions/register";
import Loader from "../../../common/ui/components/Loader";
import formValidation from "../../../services/form-validation";
import siteLogoDarkSmall from "../../../../../assets/images/placeholder-logo-dark-100x126-trans.png";

import styles from "./registration-form.module.css";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formCtrls: {
        firstName: {
          value: "",
          isError: false,
          isTouched: false,
          isValid: false,
          validators: [
            {
              rule: "required",
              feedback: "First name is required",
            },
          ],
        },
        lastName: {
          value: "",
          isError: false,
          isTouched: false,
          isValid: false,
          validators: [
            {
              rule: "required",
              feedback: "Last name is required",
            },
          ],
        },
        postalAddress: {
          value: "",
          isError: false,
          isTouched: false,
          isValid: false,
          validators: [
            {
              rule: "required",
              feedback: "Delivery address is required",
            },
          ],
        },
        billingAddress: {
          value: "",
          isError: false,
          isTouched: false,
          isValid: false,
        },
        email: {
          value: "",
          isError: false,
          isTouched: false,
          isValid: false,
          validators: [
            {
              rule: "required",
              feedback: "e-mail address is required",
            },
            {
              rule: "isEmail",
              feedback: "e-mail address is not valid",
            },
            {
              rule: "minStringLength:6",
              feedback: "e-mail address should contain 6 characters\\, minimum",
            },
          ],
        },
        password: {
          value: "",
          isError: false,
          isTouched: false,
          isValid: false,
          validators: [
            {
              rule: "required",
              feedback: "password is required",
            },
          ],
        },
      },
      isFormValid: false,
      formErrors: [],
      formErrorFeedback: "",
      error: null,
    };
    this.oktaAuth = new OktaAuth({
      url: config.oidcIdp.url,
      clientId: config.oidcIdp.clientId,
      issuer: config.oidcIdp.issuer,
      redirectUri: `${window.location.origin}/register`,
    });
  }

  componentDidMount() {
    // this.checkAuthentication();
  }

  componentDidUpdate() {
    // this.checkAuthentication();
    const {
      loginErrorMsg, sessionToken, isNewTokenTansferToStoreComplete, storeTokenOrTokens,
    } = this.props;
    const additionalParams = {
      scope: config.oidcIdp.scopes, responseType: config.oidcIdp.responseType,
    };
    if (!loginErrorMsg && sessionToken && !isNewTokenTansferToStoreComplete) {
      storeTokenOrTokens(this.oktaAuth, sessionToken, additionalParams);
    } else if (!loginErrorMsg && sessionToken && isNewTokenTansferToStoreComplete) {
      const { history } = this.props;
      history.push("/profile");
    }

    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formCtrls } = this.state;
    // const { loginInit, loginApiCall, registerInit } = this.props;
    const { registerInit, registerApiCall } = this.props;
    // TODO - needed?
    // Set redirect path as 'secureRouterReferrerPath' in local storage for
    // ImplicitCallback to avoid default redirect to root '/' path
    localStorage.setItem("secureRouterReferrerPath", JSON.stringify({ pathname: "/profile", search: "", hash: "" }));
    const requestBody = {
      firstName: formCtrls.firstName.value,
      lastName: formCtrls.lastName.value,
      postalAddress: formCtrls.postalAddress.value,
      billingAddress: formCtrls.billingAddress.value,
      email: formCtrls.email.value,
      password: formCtrls.password.value,
    };
    registerInit();
    registerApiCall(this.oktaAuth, requestBody);
    // fetch(`${config.api.baseUrl}/api/users`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(requestBody),
    // })
    //   .then(() => {
    //     loginInit();
    //     loginApiCall(this.oktaAuth, formCtrls.email.value, formCtrls.password.value);
    //   })
    //   .catch((err) => {
    //     this.setState({ error: err.message });
    //     /* TODO: Replace with debug lib */
    //     console.log("Fetch outer error: ", err); /* eslint-disable-line no-console */
    //   });
  }

  // checkAuthentication = async () => {
  //   const { auth } = this.props;
  //   const sessionToken = await auth.getIdToken();
  //   if (sessionToken) {
  //     this.setState({ sessionToken });
  //   }
  // }

  handleInputChange = field => (e) => {
    const { formErrors, formCtrls } = this.state;
    let { formErrorFeedback } = this.state;
    // Avoid state mutation
    // Shallow copy
    const updatedFormCtrls = {
      ...formCtrls,
    };
    // Shallow copy 'field' one level down
    const updatedFormCtrl = {
      ...updatedFormCtrls[field],
    };
    // deep copy 'formErrors' array
    let updatedFormErrors = JSON.parse(JSON.stringify(formErrors));

    updatedFormCtrl.value = e.target.value;

    // Start Form Validation
    const { validators } = updatedFormCtrl;
    const errors = formValidation.checkValidity(e.target.value, validators);

    // Pristine form field, mark field as invalid to provide error feedback with onBlur event
    if (!updatedFormCtrl.isTouched) {
      if (errors.length > 0) {
        updatedFormCtrl.isValid = false;
      } else {
        updatedFormCtrl.isValid = true;
      }
    }
    // Form field not pristine, so provide instant error feedback
    if (updatedFormCtrl.isTouched) {
      if (errors.length > 0) {
        updatedFormCtrl.isValid = false;
        updatedFormCtrl.isError = true;
        updatedFormErrors = formValidation.addOrUpdateFormErrors(updatedFormErrors, field, errors);
      } else {
        updatedFormCtrl.isValid = true;
        updatedFormCtrl.isError = false;
        updatedFormErrors = formValidation.removeFormErrors(updatedFormErrors, field);
      }
    }

    formErrorFeedback = formValidation.prepareErrorFeedback(updatedFormErrors, field);

    updatedFormCtrls[field] = updatedFormCtrl;

    // Check all required fields are valid
    let isFormValid = true;
    Object.getOwnPropertyNames(updatedFormCtrls).forEach((key) => {
      const formCtrl = updatedFormCtrls[key];
      if (!formCtrl.isValid) isFormValid = false;
    });
    // End Form Validation

    this.setState({
      formCtrls: updatedFormCtrls,
      isFormValid,
      formErrors: updatedFormErrors,
      formErrorFeedback,
    });
  }

  handleInputBlur = field => (e) => {
    const { formErrors, formCtrls } = this.state;
    let { formErrorFeedback } = this.state;
    // Avoid state mutation
    // Shallow copy
    const updatedFormCtrls = {
      ...formCtrls,
    };
    // Shallow copy 'field' one level down
    const updatedFormCtrl = {
      ...updatedFormCtrls[field],
    };
    // deep copy 'formErrors' array
    let updatedFormErrors = JSON.parse(JSON.stringify(formErrors));

    // Start Form Validation
    const { validators } = updatedFormCtrl;
    const errors = formValidation.checkValidity(e.target.value, validators);

    if (!updatedFormCtrl.isTouched) {
      if (errors.length > 0) {
        updatedFormCtrl.isValid = false;
        updatedFormCtrl.isError = true;
        updatedFormErrors = formValidation.addOrUpdateFormErrors(updatedFormErrors, field, errors);
      } else {
        updatedFormCtrl.isValid = true;
        updatedFormCtrl.isError = false;
        updatedFormErrors = formValidation.removeFormErrors(updatedFormErrors, field);
      }
    }

    formErrorFeedback = formValidation.prepareErrorFeedback(updatedFormErrors, field);

    if (!updatedFormCtrl.isTouched) {
      updatedFormCtrl.isTouched = true;
    }
    // End Form Validation

    updatedFormCtrls[field] = updatedFormCtrl;

    this.setState({
      formCtrls: updatedFormCtrls,
      formErrors: updatedFormErrors,
      formErrorFeedback,
    });
  }

  render() {
    const {
      formCtrls, isFormValid, formErrorFeedback, error,
    } = this.state;
    const {
      registerErrorMsg, loginErrorMsg, registerIsPending, loginIsPending,
    } = this.props;

    const serverRegisterErrorMessage = registerErrorMsg ? (
      <Message
        error
        header="Attempt unsuccessful"
        content={registerErrorMsg}
        key="errorFormServer"
      />
    ) : null;
    const serverLoginErrorMessage = loginErrorMsg ? (
      <Message
        error
        header="Attempt unsuccessful"
        content={loginErrorMsg}
        key="errorFormServer"
      />
    ) : null;
    const clientErrorMessage = formErrorFeedback ? (
      <Message
        error
        header="Form error(s) found"
        content={formErrorFeedback}
        key="errorFormClient"
      />
    ) : null;
    const errorMessage = error ? (
      <span className="error-message">{error}</span>
    ) : null;

    const formMarkup = !registerIsPending || !loginIsPending
      ? (
        <div className={styles.registrationForm} key="loginFormMarkup">
          <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                <Image src={siteLogoDarkSmall} />
                Register your account
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment textAlign="left">
                  <Form.Input
                    label="First name"
                    required
                    error={formCtrls.firstName.isError}
                    placeholder="First name (required)"
                    type="text"
                    id="firstName"
                    value={formCtrls.firstName.value}
                    onChange={this.handleInputChange("firstName")}
                    onBlur={formCtrls.firstName.isValid ? null : this.handleInputBlur("firstName")}
                  />
                  <Form.Input
                    label="Last name"
                    required
                    error={formCtrls.lastName.isError}
                    placeholder="Last name (required)"
                    type="text"
                    id="lastName"
                    value={formCtrls.lastName.value}
                    onChange={this.handleInputChange("lastName")}
                    onBlur={formCtrls.lastName.isValid ? null : this.handleInputBlur("lastName")}
                  />
                  <Form.Input
                    label="Postal address"
                    required
                    error={formCtrls.postalAddress.isError}
                    placeholder="Postal address (required)"
                    type="text"
                    id="postalAddress"
                    value={formCtrls.postalAddress.value}
                    onChange={this.handleInputChange("postalAddress")}
                    onBlur={formCtrls.postalAddress.isValid ? null : this.handleInputBlur("postalAddress")}
                  />
                  <Form.Input
                    label="Billing address"
                    error={formCtrls.billingAddress.isError}
                    placeholder="Billing address"
                    type="text"
                    id="billingAddress"
                    value={formCtrls.billingAddress.value}
                    onChange={this.handleInputChange("billingAddress")}
                    onBlur={formCtrls.billingAddress.isValid ? null : this.handleInputBlur("billingAddress")}
                  />
                  <Form.Input
                    label="E-mail address"
                    required
                    error={formCtrls.email.isError}
                    placeholder="E-mail address (required)"
                    id="email"
                    type="text"
                    value={formCtrls.email.value}
                    onChange={this.handleInputChange("email")}
                    onBlur={formCtrls.email.isValid ? null : this.handleInputBlur("email")}
                  />
                  <Form.Input
                    label="Password"
                    required
                    error={formCtrls.password.isError}
                    placeholder="Password (required)"
                    type="password"
                    id="password"
                    value={formCtrls.password.value}
                    onChange={this.handleInputChange("password")}
                    onBlur={formCtrls.password.isValid ? null : this.handleInputBlur("password")}
                  />
                  <Button fluid type="submit" size="large" disabled={!isFormValid}>
                    Register
                  </Button>
                </Segment>
              </Form>
              { errorMessage }
              { clientErrorMessage }
              { serverRegisterErrorMessage }
              { serverLoginErrorMessage }
            </Grid.Column>
          </Grid>
        </div>
      ) : <Loader isLoading={loginIsPending} key="loginFormLoader" />;

    return [formMarkup];
  }
}

const mapStateToProps = state => ({
  sessionToken: state.login.sessionToken,
  isNewTokenTansferToStoreComplete: state.login.isNewTokenTansferToStoreComplete,
  loginIsPending: state.login.isPending,
  loginErrorMsg: state.login.errorMsg,
  registerIsPending: state.register.isPending,
  registerErrorMsg: state.register.errorMsg,
});

const mapDispatchToProps = dispatch => ({
  // loginInit: () => {
  //   dispatch(actionsLogin.loginInit());
  // },
  // loginApiCall: (oktaAuth, username, password) => {
  //   dispatch(actionsLogin.loginApiCall(oktaAuth, username, password));
  // },
  storeTokenOrTokens: (oktaAuth, sessionToken, additionalParams = {}) => {
    dispatch(actionsLogin.storeTokenOrTokens(oktaAuth, sessionToken, additionalParams));
  },
  registerInit: () => {
    dispatch(actionsRegister.registerInit());
  },
  registerApiCall: (oktaAuth, data) => {
    dispatch(actionsRegister.registerApiCall(oktaAuth, data));
  },
});

RegistrationForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sessionToken: PropTypes.string.isRequired,
  isNewTokenTansferToStoreComplete: PropTypes.bool.isRequired,
  loginErrorMsg: PropTypes.string.isRequired,
  registerErrorMsg: PropTypes.string.isRequired,
  loginIsPending: PropTypes.bool.isRequired,
  registerIsPending: PropTypes.bool.isRequired,
  // loginInit: PropTypes.func.isRequired,
  // loginApiCall: PropTypes.func.isRequired,
  storeTokenOrTokens: PropTypes.func.isRequired,
  registerInit: PropTypes.func.isRequired,
  registerApiCall: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm));
