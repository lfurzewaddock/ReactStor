import * as constants from "../constants";
import * as actionsAuth from "./auth";
import tokenService from "../../../services/token";

export const logout = () => ({
  type: constants.LOGOUT,
});

export const logoutError = error => ({
  type: constants.LOGOUT_ERROR,
  payload: error,
});

export const login = () => ({
  type: constants.LOGIN,
});

export const loginError = error => ({
  type: constants.LOGIN_ERROR,
  payload: error,
});

export const loginSuccess = data => ({
  type: constants.LOGIN_SUCCESS,
  payload: data,
});

export const loginStoreTokensSuccess = () => ({
  type: constants.LOGIN_STORE_TOKENS_SUCCESS,
});

export const loginStoreTokensError = error => ({
  type: constants.LOGIN_STORE_TOKENS_ERROR,
  payload: error,
});

export const loginInit = () => dispatch => dispatch(login());

export const loginApiCall = (oktaAuth, username, password) => dispatch => oktaAuth.signIn({
  username,
  password,
}).then((res) => {
  console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
  dispatch(loginSuccess(res.sessionToken));
  // debugger; /* eslint-disable-line no-debugger */
}).catch((err) => {
  console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
  dispatch(loginError(err.message));
});

export const storeTokenOrTokens = (
  oktaAuth,
  sessionToken,
  additionalParams = {},
) => dispatch => (tokenService.getTokenOrTokens(
  oktaAuth,
  sessionToken,
  additionalParams,
).then((tokenOrTokens) => {
  // debugger; /* eslint-disable-line no-debugger */
  tokenService.storeTokenOrTokens(oktaAuth, tokenOrTokens);
  dispatch(loginStoreTokensSuccess());
}).catch(function tokenError(err) {
  dispatch(loginStoreTokensError(err.message));
}));

export const logoutApiCall = auth => dispatch => auth.logout()
  .then(() => {
    // eslint-disable-next-line no-debugger
    // debugger;
    // console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
    dispatch(logout());
    dispatch(actionsAuth.isAuthStatus(false));
  }).catch((err) => {
    // console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
    dispatch(logoutError(err.message));
  });
