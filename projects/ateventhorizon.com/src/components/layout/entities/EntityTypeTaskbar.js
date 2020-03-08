import React, {Fragment, useEffect, useState} from "react";
import {changeEntitiesGroup, getEntitiesOfGroup, getFullEntity} from "../../../actions/entities";
import {
  GroupFont,
  GroupGeom,
  GroupImage,
  GroupMaterial,
  GroupProfile,
  GroupScript,
  GroupUI
} from "../../../utils/utils";
import EntitiesThumbHandler from "./EntitiesThumbHandler";
import EntityDragAndImport from "./EntityDragAndImport";
import {useGlobal} from "reactn";

// const AppStrID = "Apps";
const ScriptStrID = "Scripts";
const ObjectsStrID = "Objects";
const MaterialsStrID = "Materials";
const ImagesStrID = "Images";
const FontsStrID = "Fonts";
const GUIsStrID = "UIs";
const VectorsStrID = "Vectors";
const ColorsStrID = "Colors";

const EntityTypeTaskBar = () => {
  const [currentGroup, setCurrentGroup] = useState("default");
  const [auth] = useGlobal('auth');
  const [entities] = useGlobal('entities');
  const entries = entities ? entities.entriesFiltered : null;
  const currentEntity = entities ? entities.currentEntity : null;

  useEffect(() => {
    if ( currentGroup === "default") {
      const groupId = GroupScript;
      setCurrentGroup(groupId);
      getEntitiesOfGroup(groupId, auth.project);
    }
  }, [currentGroup, auth]);

  const viewMore = group => () => {
    let groupId = "";
    if (group === ScriptStrID) groupId = GroupScript;
    if (group === ObjectsStrID) groupId = GroupGeom;
    if (group === MaterialsStrID) groupId = GroupMaterial;
    if (group === ImagesStrID) groupId = GroupImage;
    if (group === GUIsStrID) groupId = GroupUI;
    if (group === FontsStrID) groupId = GroupFont;
    if (group === VectorsStrID) groupId = GroupProfile;
    if (group === ColorsStrID) groupId = "color_scheme";
    if (currentGroup !== groupId) {
      setCurrentGroup(groupId);
      changeEntitiesGroup(groupId, auth.project);
      // return <Redirect to="/dashboard/material" />;
    }
  };

  const topSideEntry = (icon, text, selected) => {
    return (
      <div className="leftSideBarGroupContainer">
        <div
          className={
            selected
              ? "leftSideBarGroup leftSideBarGroupSelected"
              : "leftSideBarGroup"
          }
        >
          <span onClick={viewMore(text)}>
            <span className="leftSideBarIcon">
              <i className={icon} />
            </span>
            <span className="leftSideBarText"> {text}</span>
          </span>
        </div>
        {selected && (
          <Fragment>
            <EntityDragAndImport />
            <EntitiesThumbHandler
              currentEntity={currentEntity}
              entries={entries}
              onClicked={getFullEntity}
              group={currentGroup}
            />
          </Fragment>
        )}
      </div>
    );
  };

  const topEntitySelectorBar = (
    <div className="topentityselectorbar-a topEntitySelectorBar">
      {topSideEntry("fas fa-rocket", ScriptStrID, currentGroup === GroupScript)}
      {topSideEntry("fas fa-cube", ObjectsStrID, currentGroup === GroupGeom)}
      {topSideEntry(
        "fas fa-code-branch",
        MaterialsStrID,
        currentGroup === GroupMaterial
      )}
      {topSideEntry("fas fa-images", ImagesStrID, currentGroup === GroupImage)}
      {topSideEntry("fas fa-bars", GUIsStrID, currentGroup === GroupUI)}
      {topSideEntry("fas fa-font", FontsStrID, currentGroup === GroupFont)}
      {topSideEntry(
        "fas fa-vector-square",
        VectorsStrID,
        currentGroup === GroupProfile
      )}
      {topSideEntry(
        "fas fa-brush",
        ColorsStrID,
        currentGroup === "colors_scheme"
      )}
    </div>
  );

  return <Fragment>{topEntitySelectorBar}</Fragment>;
};

export default EntityTypeTaskBar;
