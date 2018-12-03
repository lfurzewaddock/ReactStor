import * as constants from "../constants";

const initialState = {
  isPending: false,
  errorMsg: "",
  data: [],
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case constants.CATEGORY_RETRIEVE_DATA_BEGIN:
      return Object.assign({}, state, { isPending: true });
    case constants.CATEGORY_RETRIEVE_DATA_FAILURE:
      return Object.assign({}, state, { isPending: false, errorMsg: action.payload });
    case constants.CATEGORY_RETRIEVE_DATA_SUCCESS:
      return Object.assign({}, state, { isPending: false, errorMsg: "", data: action.payload });
    default:
      return state;
  }
};

export default categories;
