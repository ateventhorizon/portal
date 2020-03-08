import axios from "axios";
import {wscClose, wscConnect} from "../utils/webSocketClient";
import {isStatusCodeSuccessful} from "./apiStatus";

export const loadUser = async () => {
  return await axios.get(`/api/user`);
}

const getTokenResponse = async res => {
  if ( isStatusCodeSuccessful(res.status) ) {
    localStorage.setItem("token", res.data.token);
    wscConnect(res.data.session);
    return await loadUser();
  }
  return res;
}

export const loginUser = async (email, password) => {
  const res = await axios.post("/api/gettoken", { email:email, password:password} );
  return await getTokenResponse(res);
};

export const registerUser = async (name, email, password) => {
  const res = await axios.post("/api/createuser", { name, email, password });
  return await getTokenResponse(res);
};

export const logoutUser = async () => {
  const res = await axios.put(`/api/cleanToken`);
  localStorage.removeItem("token");
  wscClose();
  return res;
};
