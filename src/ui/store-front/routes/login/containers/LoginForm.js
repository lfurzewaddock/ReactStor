import React, { Component } from "react";
import OktaAuth from "@okta/okta-auth-js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  // eslint-disable-next-line no-unused-vars
  Button, Form, Input, Grid, Header, Image, Message, Segment, Icon,
} from "semantic-ui-react";

import * as actionsLogin from "../../../modules/users/actions/login";
import Loader from "../../../common/ui/components/Loader";
import formValidation from "../../../services/form-validation";
import siteLogoDarkSmall from "../../../../../assets/images/placeholder-logo-dark-100x126-trans.png";

import styles from "./login-form.module.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formCtrls: {
        username: {
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
    };
    const {
      baseUrl, clientId, issuer, redirectUri,
    } = this.props;
    this.oktaAuth = new OktaAuth({
      url: baseUrl, clientId, issuer, redirectUri,
    });
  }

  componentDidUpdate = () => {
    const {
      errorMsg,
      sessionToken,
      isNewTokenTansferToStoreComplete,
      storeTokenOrTokens,
      scope,
      responseType,
    } = this.props;
    const additionalParams = { scope, responseType };
    if (!errorMsg && sessionToken && !isNewTokenTansferToStoreComplete) {
      storeTokenOrTokens(this.oktaAuth, sessionToken, additionalParams);
    } else if (!errorMsg && sessionToken && isNewTokenTansferToStoreComplete) {
      const { history } = this.props;
      history.push("/profile");
    }

    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formCtrls } = this.state;
    const { loginInit, loginApiCall } = this.props;
    loginInit();
    loginApiCall(this.oktaAuth, formCtrls.username.value, formCtrls.password.value);
  }

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
      formCtrls, isFormValid, formErrorFeedback,
    } = this.state;
    const { errorMsg, isPending } = this.props;

    const serverErrorMessage = errorMsg ? (
      <Message
        error
        header="Attempt unsuccessful"
        content={errorMsg}
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

    const formMarkup = !isPending
      ? (
        <div className={styles.loginForm} key="loginFormMarkup">
          <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                <Image src={siteLogoDarkSmall} />
                Log-in to your account
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment>
                  <Form.Input
                    fluid
                    error={formCtrls.username.isError}
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address (required)"
                    id="username"
                    type="text"
                    value={formCtrls.username.value}
                    onChange={this.handleInputChange("username")}
                    onBlur={formCtrls.username.isValid ? null : this.handleInputBlur("username")}
                  />
                  <Form.Input
                    fluid
                    error={formCtrls.password.isError}
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password (required)"
                    type="password"
                    id="password"
                    value={formCtrls.password.value}
                    onChange={this.handleInputChange("password")}
                    onBlur={formCtrls.password.isValid ? null : this.handleInputBlur("password")}
                  />
                  <Button fluid type="submit" size="large" primary disabled={!isFormValid}>
                    Login
                  </Button>
                </Segment>
              </Form>
              { clientErrorMessage }
              { serverErrorMessage }
              <Message>
                New to us?&nbsp;
                <Link to="/register">Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      ) : <Loader isLoading={isPending} key="loginFormLoader" />;

    return [formMarkup];
  }
}

const mapStateToProps = state => ({
  sessionToken: state.login.sessionToken,
  isNewTokenTansferToStoreComplete: state.login.isNewTokenTansferToStoreComplete,
  isPending: state.login.isPending,
  errorMsg: state.login.errorMsg,
});

const mapDispatchToProps = dispatch => ({
  loginInit: () => {
    dispatch(actionsLogin.loginInit());
  },
  loginApiCall: (oktaAuth, username, password) => {
    dispatch(actionsLogin.loginApiCall(oktaAuth, username, password));
  },
  storeTokenOrTokens: (oktaAuth, sessionToken, additionalParams = {}) => {
    dispatch(actionsLogin.storeTokenOrTokens(oktaAuth, sessionToken, additionalParams));
  },
});

LoginForm.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  scope: PropTypes.arrayOf(PropTypes.string),
  responseType: PropTypes.arrayOf(PropTypes.string),
  issuer: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sessionToken: PropTypes.string.isRequired,
  isNewTokenTansferToStoreComplete: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  isPending: PropTypes.bool.isRequired,
  loginInit: PropTypes.func.isRequired,
  loginApiCall: PropTypes.func.isRequired,
  storeTokenOrTokens: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  responseType: ["id_token", "token"],
  scope: ["openid", "email", "profile"],
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
