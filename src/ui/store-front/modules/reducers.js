import { combineReducers } from "redux";
import * as users from "./users/reducers";
import * as products from "./products/reducers";
import * as categories from "./categories/reducers";
import * as routes from "./routes/reducers";

const reducers = combineReducers({
  auth: users.auth,
  login: users.login,
  register: users.register,
  products: products.products,
  categories: categories.categories,
  routes: routes.routes,
});

export default reducers;
