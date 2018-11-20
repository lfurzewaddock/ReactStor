import * as constants from "../constants";

const initialState = {
  isPending: false,
  errorMsg: "",
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case constants.REGISTER:
      return Object.assign({}, state, { isPending: true });
    case constants.REGISTER_ERROR:
      return Object.assign({}, state, {
        isPending: false, errorMsg: action.payload,
      });
    case constants.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        errorMsg: "",
      });
    default:
      return state;
  }
};

export default register;
