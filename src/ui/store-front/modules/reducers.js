import { combineReducers } from "redux";
import * as users from "./users/reducers";

const reducers = combineReducers({
  auth: users.auth,
  login: users.login,
  register: users.register,
});

export default reducers;
