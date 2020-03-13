import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {checkFileExtensionsOnEntityGroup, GroupImage} from "../../../utils/entityUtils";

const DragAndDrop = props => {

  const updateMaterialTextureCallback = () => {
    //eslint-reimplement
    // dispatch({
    //   type: SET_MODAL_SELECTED_ENTITY_NAME,
    //   payload: {
    //     group:props.entry.groupName,
    //     fatherEntityName: props.entry.key_id,
    //     onClickCallback: updateTextureParameterOnMaterial,
    //     selectedModalEntityName: props.entry.inputTextureName
    //   }
    // });
  };

  const onDrop = useCallback(
    acceptedFiles => {
      if (checkFileExtensionsOnEntityGroup(GroupImage, acceptedFiles[0].name)) {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // dispatch(addEntity(acceptedFiles[0].name, reader.result, GroupImage));
          // dispatch(changeMaterialPropery(props.entry.inputTextureName+"-string", props.entry.key_id, "49viewlogo"));
        };
        acceptedFiles.forEach(file => reader.readAsArrayBuffer(file));
      }
    },
    []
  );
  const { getRootProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="materialPropertyTexture" onClick={updateMaterialTextureCallback}>
      <img src={props.entry.textureName} alt="" />
    </div>
  );
};

export default DragAndDrop;
