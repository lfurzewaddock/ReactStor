import * as constants from "../constants";
import * as actionsLogin from "./login";
import storeApi from "../../store-api";

export const register = () => ({
  type: constants.REGISTER,
});

export const registerError = error => ({
  type: constants.REGISTER_ERROR,
  payload: error,
});

export const registerSuccess = data => ({
  type: constants.REGISTER_SUCCESS,
  payload: data,
});

export const registerInit = () => dispatch => dispatch(register());

export const registerApiCall = (oktaAuth, data) => dispatch => storeApi.post("/api/users", data, {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}).then((res) => {
  //   console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
  dispatch(registerSuccess(res));
  dispatch(actionsLogin.loginInit());
  dispatch(actionsLogin.loginApiCall(
    oktaAuth, data.email, data.password,
  ));
}).catch((err) => {
  console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
  dispatch(registerError(err.message));
});
