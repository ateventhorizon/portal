import React from "react";

export const GroupGeom = "geom";
export const GroupMaterial = "material";
export const GroupImage = "image";
export const GroupProfile = "profile";
export const GroupScript = "script";
export const GroupFont = "font";
export const GroupUI = "ui";

export const ScriptStrID = "Scripts";
export const ObjectsStrID = "Objects";
export const MaterialsStrID = "Materials";
export const ImagesStrID = "Images";
export const FontsStrID = "Fonts";
export const GUIsStrID = "UIs";
export const VectorsStrID = "Vectors";
export const ColorsStrID = "Colors";


export const checkCommonFileExtension = (group, ext) => {
  if (group === GroupGeom) {
    if (ext === "zip" || ext === "glb" || ext === "fbx") return true;
  } else if (group === GroupMaterial) {
    if (ext === "zip" || ext === "sbsar") return true;
  } else if (group === GroupImage) {
    if (
      ext === "jpeg" ||
      ext === "png" ||
      ext === "jpg" ||
      ext === "hdr" ||
      ext === "exr" ||
      ext === "tga" ||
      ext === "tiff" ||
      ext === "gif"
    ) {
      return true;
    }
  } else if (group === GroupFont) {
    if (ext === "ttf") return true;
  } else if (group === GroupUI) {
    if (ext === "json") return true;
  } else if (group === GroupProfile) {
    if (ext === "svg") return true;
  }

  return false;
};

export const groupHasCreateEditor = group => {
  return group !== "" && (group === GroupUI || group === GroupScript);

};

export const groupHasImportFacility = group => {
  return group !== "" && group !== GroupScript;

};

export const groupHasUpdateFacility = (currEntity, group) => {
  return !!(currEntity && group !== GroupScript);

};

export const groupHasMetadataSection = (currEntity, group) => {
  return !!(currEntity && group !== GroupScript);

};

export const groupHasRenderToolbar = (currEntity, group) => {
  return !!(currEntity && (group === GroupGeom || group === GroupMaterial));

};

export const checkFileExtensionsOnEntityGroup = (group, filename) => {
  const ext = filename
    .split(".")
    .pop()
    .toLowerCase();

  return checkCommonFileExtension(group, ext);
};

export const entityTypeSelector = entry => {
  if (entry.group === GroupScript) {
    if (entry.metadata.thumb === "")
      return (
        <span className="geomThumbNotFound">
          <i className="fas fa-rocket"/>
        </span>
      );
  } else if (entry.group === GroupGeom) {
    if (entry.thumb === "")
      return (
        <span className="geomThumbNotFound">
          <i className="fas fa-cubes"/>
        </span>
      );
  } else if (entry.group === GroupImage || entry.group === GroupMaterial || entry.group === GroupProfile) {
    if (entry.thumb === "") {
      return (
        <span className="imageThumbNotFound">
          <i className="far fa-frown"/>
        </span>
      );
    }
  } else if (entry.group === GroupFont) {
    if (entry.thumb === "") {
      return (
        <span className="imageThumbNotFound">
        <i className="fas fa-font"/>
      </span>
      );
    }
  } else if (entry.group === GroupUI) {
    return (
      <span className="imageThumbNotFound">
        <i className="fas fa-bars"/>
      </span>
    );
  }

  return <img className="imgGreyOutline" src={entry.thumb} alt=""/>;
};
