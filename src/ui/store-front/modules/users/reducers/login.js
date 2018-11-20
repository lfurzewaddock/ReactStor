import * as constants from "../constants";

const initialState = {
  isPending: false,
  isNewTokenTansferToStoreComplete: false,
  sessionToken: "",
  errorMsg: "",
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGOUT:
      return Object.assign({}, state, {
        isPending: false, isNewTokenTansferToStoreComplete: false, sessionToken: "", errorMsg: "",
      });
    case constants.LOGOUT_ERROR:
      return Object.assign({}, state, { isPending: false, sessionToken: "", errorMsg: action.payload });
    case constants.LOGIN:
      return Object.assign({}, state, { isPending: true });
    case constants.LOGIN_ERROR:
      return Object.assign({}, state, {
        isPending: false, sessionToken: "", errorMsg: action.payload,
      });
    case constants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        sessionToken: action.payload, errorMsg: "",
      });
    case constants.LOGIN_STORE_TOKENS_SUCCESS:
      return Object.assign({}, state, {
        isPending: false, isNewTokenTansferToStoreComplete: true, errorMsg: "",
      });
    case constants.LOGIN_STORE_TOKENS_ERROR:
      return Object.assign({}, state, {
        isPending: false, isNewTokenTansferToStoreComplete: false, errorMsg: action.payload,
      });
    default:
      return state;
  }
};

export default login;
