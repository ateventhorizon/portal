import React from "react";

const moment = require("moment");

const EntityInfo = ({currentEntity}) => {
  const creationDate =
    currentEntity && currentEntity.entity.creationDate
      ? moment(currentEntity.entity.creationDate).fromNow()
      : "1st Jan 1970";
  const updateDate =
    currentEntity &&
    currentEntity.entity.lastUpdatedDate &&
    currentEntity.entity.lastUpdatedDate !==
    currentEntity.entity.creationDate
      ? moment(currentEntity.entity.lastUpdatedDate).fromNow()
      : "Never";

  const hs = currentEntity ? currentEntity.entity.hash : "";
  const pad = 6;
  const hashContrived = currentEntity
    ? hs.slice(0, pad) + "..." + hs.slice(hs.length - pad, hs.length)
    : hs;

  return (
    <div className="entity-info-a">
      <p>
        <i className="fas fa-info-circle"> </i> Info
      </p>
      <div className="entity-info-c">
        <div className="extra-small text-pale">
          <i className="fas fa-user"/>
        </div>
        <div className="small text-pale">
          owner
        </div>
        <div className="normal text-secondary-alt text-clip">
          {currentEntity.entity.creator
            ? currentEntity.entity.creator.name
            : currentEntity.entity.project}
        </div>
        <div className="extra-small text-pale">
          <i className="fas fa-clock"/>
        </div>
        <div className="small text-pale">created</div>
        <div className="normal text-secondary-alt text-clip">
          {creationDate}
        </div>
        <div className="extra-small text-pale">
          <i className="fas fa-calendar"/>
        </div>
        <div className="small text-pale">updated</div>
        <div className="normal text-secondary-alt text-clip">
          {updateDate}
        </div>
        <div className="extra-small text-pale">
          <i className="fas fa-code"/>
        </div>
        <div className="small text-pale">hash</div>
        <div className="normal text-secondary-alt text-clip">
          {hashContrived}
        </div>
      </div>
    </div>
  );
};

export default EntityInfo;
