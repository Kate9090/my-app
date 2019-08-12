import {combineReducers} from "redux";
import {reducer as user} from "./user/user";
import NameSpace from "./name-spaces";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
