import React, {Fragment} from "react";
import {
  GroupFont,
  GroupGeom,
  GroupImage,
  GroupMaterial,
  GroupProfile,
  GroupScript,
  GroupUI
} from "../../../utils/entityUtils";
import EntitiesThumbHandler from "./EntitiesThumbHandler";
import EntityDragAndImport from "./EntityDragAndImport";
import {useGlobal} from "reactn";
import {api, useApi} from "../../../futuremodules/api/apiEntryPoint";
import {getEntitiesOfGroup} from "../../../futuremodules/entities/entitiesApiCalls";
import {
  Currents,
  Entities,
  setCurrentGroup,
  useGetCurrentGroup
} from "../../../futuremodules/entities/entitiesAccessors";
import {useGetProject} from "../../../futuremodules/auth/authAccessors";
import {
  ColorsStrID,
  FontsStrID,
  GUIsStrID,
  ImagesStrID,
  MaterialsStrID,
  ObjectsStrID,
  ScriptStrID, VectorsStrID
} from "../../../utils/entityUtils";

const EntityTypeTaskBar = () => {
  const apiEntities = useApi(Entities);
  const currents = useGlobal(Currents);
  const currentGroup = useGetCurrentGroup();
  const project = useGetProject();

  // useEffect(() => {
  //   // getEntitiesOfGroup(currentGroup, auth.project);
  // }, []);

  const viewMore = group => async () => {
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
      setCurrentGroup(currents, groupId);
      await api( apiEntities, getEntitiesOfGroup, groupId, project);
      // groupSelected: payload,
      //   loading: true,
      //   currentTags: [],
      //   entriesFiltered: [],
      //   entries: []

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
            <EntityDragAndImport/>
            <EntitiesThumbHandler/>
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
