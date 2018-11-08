import * as constants from "../constants";

const initialState = {
  authenticated: null,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case constants.AUTH_ENABLED:
      return Object.assign({}, state, { authenticated: action.payload, error: null });
    case constants.AUTH_ENABLED_ERROR:
      return Object.assign({}, state, { authenticated: false, error: action.payload });
    default:
      return state;
  }
};

export default auth;
