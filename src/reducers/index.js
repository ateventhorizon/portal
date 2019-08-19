import { combineReducers } from "redux";
import alert from "./alert";
import localalert from "./localalert";
import confirmalert from "./confirmalert";
import auth from "./auth";
import wasm from "./wasm";
import entities from "./entities";

export default combineReducers({
  alert,
  localalert,
  confirmalert,
  auth,
  wasm,
  entities
});
