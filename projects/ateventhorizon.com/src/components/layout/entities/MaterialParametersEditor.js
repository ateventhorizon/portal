import React from "react";
import DragAndDrop from "./DragAndDrop";
import {GroupImage} from "../../../utils/entityUtils";

const MaterialParametersEditor = (props) => {

  const onReplaceEntity = e => {
    // eslint-reimplement
    // store.dispatch({
    //     type: SET_MODAL_SELECTED_ENTITY_NAME,
    //     payload: {
    //         group: GroupMaterial,
    //         onClickCallback: replaceMaterial,
    //         selectedModalEntityName: e.currentTarget.dataset.id
    //     }
    // });
  };

  const MaterialTextureEntry = props => {
    return (
      <div className="materialTextureEntity">
        <div className="materialPropertyLabel">{props.label}</div>
        <div className="materialPropertySlider">
          <input
            type={props.isColor ? "color" : "range"}
            className={props.isColor ? "" : "slider"}
            min="1"
            max="100"
            id={props.key_id}
            name={props.inputname}
            defaultValue={props.value}
            // eslint-reimplement
            // onChange={eb => dispatch(changeMaterialPropery(eb.target.name, eb.target.id, eb.target.value))}
          />
        </div>
        <DragAndDrop entry={props}/>
      </div>
    );
  };

  const e = props.entity;////fillMaterialParams(entity.jsonRet.mKey, entity.jsonRet.values);

  return (

    <div key={e.key} className="smallObjectMaterial">
      <div className="matName-a">{e.key}</div>
      <div className="replaceMat-a">
                            <span data-id={e.key} onClick={eb => onReplaceEntity(eb)}>
                              <i className="fas fa-exchange-alt"/>
                            </span>
      </div>
      <div className="materialTextureContainer">
        <MaterialTextureEntry
          groupName={GroupImage}
          key_id={e.key}
          value={e.baseColor}
          label="Color"
          isColor={true}
          inputname="diffuseColor-hexcolor"
          inputTextureName="diffuseTexture"
          textureName={e.diffuseTexture}
        />

        <MaterialTextureEntry
          groupName={GroupImage}
          key_id={e.key}
          value="100"
          label="Normal"
          isColor={false}
          inputname=""
          inputTextureName="normalTexture"
          textureName={e.normalTexture}
        />

        <MaterialTextureEntry
          groupName={GroupImage}
          key_id={e.key}
          value={e.metallicValue * 100}
          label="Metallic"
          isColor={false}
          inputname="metallicV-float100"
          inputTextureName="metallicTexture"
          textureName={e.metallicTexture}
        />

        <MaterialTextureEntry
          groupName={GroupImage}
          key_id={e.key}
          value={e.roughnessValue * 100}
          label="Roughness"
          isColor={false}
          inputname="roughnessV-float100"
          inputTextureName="roughnessTexture"
          textureName={e.roughnessTexture}
        />

        <MaterialTextureEntry
          groupName={GroupImage}
          key_id={e.key}
          value={e.aoValue * 100}
          label="Ambient Occlusion"
          isColor={false}
          inputname="aoV-float100"
          inputTextureName="aoTexture"
          textureName={e.aoTexture}
        />

        <MaterialTextureEntry
          groupName={GroupImage}
          key_id={e.key}
          value={e.opacityValue * 100}
          label="Opacity"
          isColor={false}
          inputname="opacity-float100"
          inputTextureName="opacityTexture"
          textureName={e.opacityTexture}
        />

        <MaterialTextureEntry
          groupName={GroupImage}
          key_id={e.key}
          value={e.translucencyValue * 100}
          label="Translucency"
          isColor={false}
          inputname="translucency-float100"
          inputTextureName="diffuseTexture"
          textureName={e.translucencyTexture}
        />

        <MaterialTextureEntry
          groupName={GroupImage}
          key_id={e.key}
          value={e.heightValue * 100}
          label="Height"
          isColor={false}
          inputname="height-float100"
          inputTextureName="heightTexture"
          textureName={e.heightTexture}
        />
      </div>
    </div>
  );
};

export default MaterialParametersEditor;
