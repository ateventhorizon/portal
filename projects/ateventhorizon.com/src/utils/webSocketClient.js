import store from "../store";
import {ADD_ENTITY, LOADING_FINISHED} from "../actions/types";
import {getFullEntity} from "../actions/entities";
import {webSocketClientInstance, wscSend} from "../futuremodules/auth/websockets";

export const updateAsset = (currentEntityData, currentEntity) => {
  try {
    const obj = {
      group: currentEntity.entity.group,
      entity_id: currentEntity.entity._id,
      data: currentEntityData
    };
    wscSend("UpdateEntity", obj);
  } catch (err) {
    console.log(err);
  }
};

export const placeHolderAsset = group => {
  try {
    const obj = {
      group: group
    };
    wscSend("AddPlaceHolderEntity", obj);
  } catch (err) {
    console.log(err);
  }
};

export const wscMessages = () => {
  webSocketClientInstance.onmessage = message => {
    let mdata = JSON.parse(message.data);
    if ( mdata.msg.startsWith("EntityAdded") ) {
      const state = store.getState();
      const entity = mdata.data.fullDocument;
      if ( entity && state.entities.groupSelected === entity.group) {
        store.dispatch({type: ADD_ENTITY, payload: entity});
        store.dispatch(getFullEntity(entity));
      }
      store.dispatch({type: LOADING_FINISHED, payload: null});
    }
    // else if (mdata.msg === "materialsForGeom") {
    //   setEntityNodes(mdata.data);
    // }
  };
}
