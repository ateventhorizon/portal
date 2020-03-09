import {setGlobal} from "reactn";

export const Auth = 'auth';
export const Entities = 'entities';
export const Currents = 'currents';
export const ReactWasm = 'reactWasm';

export const initGlobalStorage = () => setGlobal({
  confirmAlert: null,
  notificationAlert: null,
  auth: null,
  entities: null,
  currents: {
    currentEntity : null,
    currentGroup : null
  },
  reactWasm: null
});

