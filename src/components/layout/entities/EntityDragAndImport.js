import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useAlert } from "react-alert";
// import axios from "axios";

import { addEntity } from "../../../actions/entities";
import { checkFileExtensionsOnEntityGroup } from "../../../utils/utils";

const EntityDragAndImport = ({ addEntity, group, project, user }) => {
  const alert = useAlert();
  const onDrop = useCallback(
    acceptedFiles => {
      // check file dragged has a valid extension for asset type
      if (checkFileExtensionsOnEntityGroup(group, acceptedFiles[0].name)) {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = e => {
          addEntity(acceptedFiles[0].name, reader.result, group, project, user);
        };
        acceptedFiles.forEach(file => reader.readAsArrayBuffer(file));
      } else {
        alert.show("Wrong file type", { type: "error" });
      }
    },
    [addEntity, group, project, user, alert]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Fragment>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <span>
          <i className="fas fa-plus-circle" /> &nbsp; Add new {group}
        </span>
      </div>
    </Fragment>
  );
};

EntityDragAndImport.propTypes = {
  group: PropTypes.string,
  project: PropTypes.string,
  user: PropTypes.object,
  addEntity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.entities.group,
  project: state.auth.userdata.project,
  user: state.auth.userdata ? state.auth.userdata.user : null
});

export default connect(
  mapStateToProps,
  { addEntity }
)(EntityDragAndImport);
