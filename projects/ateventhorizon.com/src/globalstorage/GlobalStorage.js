import {setGlobal} from "reactn";

export const initGlobalStorage = () => setGlobal({
  confirmAlert: null,
  notificationAlert: null,
  auth: null,
  entities: null,
  reactWasm: null
});

