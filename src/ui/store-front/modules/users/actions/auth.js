import * as constants from "../constants";

export const isAuthStatus = data => ({
  type: constants.AUTH_ENABLED,
  payload: data,
});

export const isAuthStatusError = error => ({
  type: constants.AUTH_ENABLED_ERROR,
  payload: error,
});

export const isAuthApiCall = auth => dispatch => auth.isAuthenticated()
  .then((res) => {
    // debugger; /* eslint-disable-line no-debugger */
    // console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
    dispatch(isAuthStatus(res));
  }).catch((err) => {
    // console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
    dispatch(isAuthStatusError(err.message));
  });
