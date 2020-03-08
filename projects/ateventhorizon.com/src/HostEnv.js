import axios from "axios";

export const initHostEnv = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.validateStatus = (status) => {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  }
};
