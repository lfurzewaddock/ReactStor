import * as constants from "../constants";

const initialState = {
  isPending: false,
  errorMsg: "",
  data: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case constants.PRODUCT_DATA:
      return Object.assign({}, state, { isPending: true });
    case constants.PRODUCT_DATA_ERROR:
      return Object.assign({}, state, { isPending: false, errorMsg: action.payload });
    case constants.PRODUCT_DATA_SUCCESS:
      return Object.assign({}, state, { isPending: false, errorMsg: "", data: action.payload });
    default:
      return state;
  }
};

export default products;
