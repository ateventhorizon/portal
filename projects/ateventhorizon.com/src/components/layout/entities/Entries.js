import React, {Fragment} from "react";
import {updateEntriesPartialSearch} from "../../../actions/entities";
import EntitiesSearchBox from "./EntitiesSearchBox";
import EntityTypeTaskbar from "./EntityTypeTaskbar";

const Entries = ({ cname }) => {

  // const [entities] = useGlobal('entities');
  // const entries = entities ? entities.entriesFiltered : null;
  // const currentEntity = entities ? entities.currentEntity : null;

  return (
    <div className={cname}>
      <Fragment>
        <EntitiesSearchBox
          updatePartialSearch={updateEntriesPartialSearch}
          placeHolderText="Filter..."
        />
        <EntityTypeTaskbar />
      </Fragment>
    </div>
  );
};

export default Entries;
