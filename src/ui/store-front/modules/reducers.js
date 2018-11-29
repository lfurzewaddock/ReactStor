import { combineReducers } from "redux";
import * as users from "./users/reducers";
import * as products from "./products/reducers";

const reducers = combineReducers({
  auth: users.auth,
  login: users.login,
  register: users.register,
  products: products.products,
});

export default reducers;
