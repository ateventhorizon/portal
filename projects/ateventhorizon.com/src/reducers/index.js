import {combineReducers} from "redux";
import codemirror from "./codemirror";
import entities from "./entities";

export default combineReducers({
  codemirror,
  entities
});
