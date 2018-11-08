import * as constants from "../constants";

const initialState = {
  sessionToken: null,
  error: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGOUT:
      return Object.assign({}, state, { sessionToken: null, error: null });
    case constants.LOGOUT_ERROR:
      return Object.assign({}, state, { sessionToken: null, error: action.payload });
    case constants.LOGIN_ERROR:
      return Object.assign({}, state, { sessionToken: null, error: action.payload });
    case constants.LOGIN_SUCCESS:
      return Object.assign({}, state, { sessionToken: action.payload, error: null });
    default:
      return state;
  }
};

export default login;
