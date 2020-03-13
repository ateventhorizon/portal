import React, {Fragment} from "react";
import {decode} from "base64-arraybuffer";
import {checkCommonFileExtension, entityTypeSelector} from "../../../utils/entityUtils";
import {
  useGetCurrentEntity,
  useGetCurrentGroup,
  useGetEntities
} from "../../../futuremodules/entities/entitiesAccessors";

const EntitiesThumbHandler = () => {

  const currentEntity = useGetCurrentEntity();
  const group = useGetCurrentGroup();
  const [entries] = useGetEntities();

  let entitiesRes = [];
  if (entries) {
    const entities = entries.metadata.entities;
    for ( const e of entities ) {
      if ( e.group === group ) {
        let entryWithThumb = e;
        if (e.thumb && !e.thumb.startsWith("blob:")) {
          const bb = new Blob([decode(e.thumb)]);
          entryWithThumb.thumb =
            e.thumb !== "" ? URL.createObjectURL(bb) : "";
        }
        entryWithThumb.cname = "EntityThumbnail";
        if (currentEntity && e._id === currentEntity.entity._id) {
          entryWithThumb.cname += " leftSideBarGroupSelected";
        }
        entryWithThumb.entityId = e._id;
        entitiesRes.push(entryWithThumb);
      }
    }
  }

  const loadFullEntity = entityToRender => () => {
    console.log( "Entity callback: ", entityToRender);
    window.Module.addScriptLine(
      `rr.addSceneObject( "${entityToRender._id}", "${entityToRender.group}", "${entityToRender.hash}" )`
    );
  };

  let displayNames = {};
  entitiesRes.forEach(entry => {
    displayNames[entry._id] = [];
    if (entry.tags.length === 0) {
      displayNames[entry._id].push(entry.name);
    } else {
      entry.tags.forEach(element => {
        if (!checkCommonFileExtension(entry.group, element)) {
          displayNames[entry._id].push(element);
        }
      });
    }
  });

  return (
    <Fragment>
      {entitiesRes.map(entry => (
        <div className={entry.cname} key={entry._id} onClick={loadFullEntity(entry)}>
          <div className="EntityThumbnailInset">
            {entityTypeSelector(entry)}
          </div>
          <div className="EntityThumbnailText normal">
            {displayNames[entry._id].map(e => (
              <span key={entry._id + e}>{e} </span>
            ))}
          </div>
          <div className="EntityThumbnailOwner small">
            <span className="text-pale">
              <i className="fas fa-user-tag" />{" "}
            </span>
            <span className="text-secondary-alt">
              {entry.creator
                ? entry.creator.username
                : entry.project}
            </span>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default EntitiesThumbHandler;
