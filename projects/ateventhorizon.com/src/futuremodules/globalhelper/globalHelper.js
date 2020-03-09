import {useGlobal} from "reactn";

const updateInternal = (data, store, newdata) => {
  store({
    ...data,
    ...newdata
  });
};

export const useUpdateGlobal = (globalName, data) => {
  const [state, store] = useGlobal(globalName);
  updateInternal(state, store, data);
};

export const updateGlobal = (global, data) => {
  updateInternal( global[0], global[1], data );
};

export const getValueGlobal = (global, data) => {
  updateInternal( global[0], global[1], data );
};

