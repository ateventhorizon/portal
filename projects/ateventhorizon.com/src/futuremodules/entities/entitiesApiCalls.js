// Add post
import axios from "axios";
import {octetStreamHeader} from "../api/apiEntryPoint";

export const addEntity = async (fileName, fileData, group)  => {
  const urlEnc = encodeURIComponent(fileName);
  await axios.post("/api/fs/entity_to_elaborate/" + group + "/" + urlEnc,
    fileData,
    octetStreamHeader()
  );
};

const placeHolderEntityMaker = group => {
  return "entities/placeholder/" + group;
};

export const addPlaceHolderEntity = async group  => {
    const res = await axios.post(placeHolderEntityMaker(group));

    return res;

    // const entityFull = {
    //   entity: res.data,
    //   blobURL: null
    // };
    //
    // dispatch({
    //   type: GET_ENTITY,
    //   payload: entityFull,
    //   requirePlaceHolder: true
    // });
};

export const getEntitiesOfGroup = async (group, project) => {
  return await axios.get(`/api/entities/metadata/list/${group}/${project}`);

  // dispatch({
  //   type: dtype,
  //   payload: {data: res.data, group: group}
  // });

};

// // Get entries
// export const getEntitiesOfGroup = (group, project) => async dispatch => {
//   try {
//     dispatch({
//       type: GET_ENTITY_LIST_PRELOAD,
//       payload: group
//     });
//
//     let res = null;
//     let dtype = GET_ENTITIES;
//     res = await axios.get(`/api/entities/metadata/list/${group}/${project}`);
//     dispatch({
//       type: dtype,
//       payload: {data: res.data, group: group}
//     });
//   } catch (err) {
//     console.log(err);
//     dispatch({
//       type: ENTITY_ERROR,
//       payload: {msg: err.response}
//     });
//   }
// };
