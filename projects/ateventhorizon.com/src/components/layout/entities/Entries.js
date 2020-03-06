import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateEntriesPartialSearch} from "../../../actions/entities";
import EntitiesSearchBox from "./EntitiesSearchBox";
import EntityTypeTaskbar from "./EntityTypeTaskbar";

const Entries = ({ cname }) => {
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

Entries.propTypes = {
  loading: PropTypes.bool,
  entries: PropTypes.array,
  currentEntity: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  entries: state.entities.entriesFiltered,
  currentEntity: state.entities.currentEntity
});

export default connect(
  mapStateToProps,
  {}
)(Entries);
