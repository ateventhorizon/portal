import {combineReducers} from "redux";
import alert from "./alert";
import localalert from "./localalert";
import confirmalert from "./confirmalert";
import codemirror from "./codemirror";
import entities from "./entities";

export default combineReducers({
  alert,
  localalert,
  confirmalert,
  codemirror,
  entities
});
