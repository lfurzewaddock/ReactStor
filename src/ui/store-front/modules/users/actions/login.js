import * as constants from "../constants";
import * as actionsAuth from "./auth";

export const logout = () => ({
  type: constants.LOGOUT,
});

export const logoutError = error => ({
  type: constants.LOGOUT_ERROR,
  payload: error,
});

export const loginError = error => ({
  type: constants.LOGIN_ERROR,
  payload: error,
});

export const loginSuccess = data => ({
  type: constants.LOGIN_SUCCESS,
  payload: data,
});

export const loginApiCall = (oktaAuth, username, password) => dispatch => oktaAuth.signIn({
  username,
  password,
}).then((res) => {
  console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
  // alert(res);
  dispatch(loginSuccess(res.sessionToken));
}).catch((err) => {
  console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
  dispatch(loginError(err.message));
});

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
