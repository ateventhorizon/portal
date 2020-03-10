import {useGlobal} from "reactn";
import {Currents, Entities} from "../../globalstorage/GlobalStorage";
import {updateGlobal} from "../globalhelper/globalHelper";

export const useGetEntities = () => {
  return useGlobal(Entities);
}

export const useGetCurrentEntity = () => {
  const [store] = useGlobal(Currents);
  return store ? store.currentEntity : null;
};

export const useGetCurrentEntityData = () => {
  const [store] = useGlobal(Currents);
  return store ? store.currentEntityData : null;
};

export const useGetCurrentEntityNodes = () => {
  const [store] = useGlobal(Currents);
  return store ? store.currentEntityNodes : null;
};

export const useGetCurrentGroup = () => {
  const [store] = useGlobal(Currents);
  return store ? store.currentGroup : null;
};

export const setCurrentGroup = (store, currentGroup) => {
  updateGlobal( store, {currentGroup});
};

export const useSetCurrentGroup = (currentGroup) => {
  updateGlobal( useGlobal(Currents), {currentGroup});
};
