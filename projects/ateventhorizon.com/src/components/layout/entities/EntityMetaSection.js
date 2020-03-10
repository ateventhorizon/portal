import React from "react";
import EntityUpdateContent from "./EntityUpdateContent";
import EntityTags from "./EntityTags";
import EntityInfo from "./EntityInfo";
import {useGlobal} from 'reactn';
import axios from "axios";
import {useGetCurrentEntity} from "../../../futuremodules/entities/entitiesAccessors";

const deleteEntity = async (id) =>  {
  try {
    await axios.delete(`/entities/${id}`);
  } catch (err) {
    console.log(err);
  }
};

const EntityMetaSection = () => {

// eslint-disable-next-line
//   const [currEntity, setCurrEntity] = useGlobal('currEntity');
  const entity = useGetCurrentEntity();
// eslint-disable-next-line
  const [, setConfirmAlert] = useGlobal('confirmAlert');

  const onDeleteEntity = e => {
    setConfirmAlert({
      text: "Confirm deletion of " + entity.name,
      noText: "No",
      yesText: "Yes, do it",
      yesType: "danger",
      yesCallback: async () => {
        await deleteEntity(entity._id);
      },
    });
  };

  return (
    <div className="metadata_controls-a">
      <EntityTags/>
      <EntityInfo/>
      <div className="entity-control-a">
        <EntityUpdateContent/>
        <div className="my-3"/>
        {entity &&
        <div className="deleteentity-a">
          <input
            type="button"
            className="btn2 btn-danger"
            value="Delete"
            onClick={e => onDeleteEntity(e)}
          />
        </div>}
      </div>
    </div>
  );
};

export default EntityMetaSection;
