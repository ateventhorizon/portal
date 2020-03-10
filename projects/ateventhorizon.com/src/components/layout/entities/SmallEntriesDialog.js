import React, {Fragment, useState} from "react";
import EntitiesSearchBox from "./EntitiesSearchBox";
import EntitiesThumbHandler from "./EntitiesThumbHandler";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useGetEntities} from "../../../futuremodules/entities/entitiesAccessors";
import {updateMetadataListPartialSearch} from "../../../actions/entities";

const SmallEntriesDialog = () => {

  // eslint-reimplement
  const metadataList = useGetEntities();
  // eslint-reimplement
  // useEffect(() => {
  //   if ( metadataList.enable ) {
  //     dispatch(getMetadataListOf(metadataList.group));
  //   }
  // }, [metadataList.enable, metadataList.group, dispatch]);

  const [show, setShow] = useState(true);

  return (
      !metadataList.enable ? <Fragment/> :
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="leftFloat text-secondary lead">
            {metadataList.sourceEntityName}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EntitiesSearchBox
          updatePartialSearch={updateMetadataListPartialSearch}
          placeHolderText="Filter..."
          extraClassName="search-bar-smaller"
        />
        <EntitiesThumbHandler entries={metadataList.filtered} onClicked={metadataList.onClickCallback} callbackProps={metadataList} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SmallEntriesDialog;
