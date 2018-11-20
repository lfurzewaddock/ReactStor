import * as constants from "../constants";

const initialState = {
  authenticated: false,
  errorMsg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case constants.AUTH_ENABLED:
      return Object.assign({}, state, { authenticated: action.payload, errorMsg: "" });
    case constants.AUTH_ENABLED_ERROR:
      return Object.assign({}, state, { authenticated: false, errorMsg: action.payload });
    default:
      return state;
  }
};

export default auth;
