import React, {Fragment} from "react";
import {useGlobal} from 'reactn';
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";

const AlertContainer = () => {

// eslint-disable-next-line
  const [confirmAlert, setConfirmAlert] = useGlobal('confirmAlert');

  if (confirmAlert.show === true) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={confirmAlert.show}>
        {confirmAlert.title && <Modal.Header closeButton>
          <Modal.Title>{confirmAlert.title}</Modal.Title>
        </Modal.Header>}
        <Modal.Body>{confirmAlert.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={confirmAlert.noCallback}>
            {confirmAlert.noText}
          </Button>
          <Button variant={confirmAlert.yesType} onClick={confirmAlert.yesCallback}>
            {confirmAlert.yesText}
          </Button>
        </Modal.Footer>
      </Modal>)
  }

  // if (alerts !== null && alerts.length > 0) {
  //     const alert = alerts[0];
  //
  //     return <Alert key={alert.id} variant={alert.alertType} onClose={() => {
  //         dismiss(alert)
  //     }} dismissible>
  //         <p>
  //             {alert.msg}
  //         </p>
  //         <div className="d-flex justify-content-end">
  //             <Button onClick={() => {
  //                 dismiss(alert)
  //             }} variant="outline-secondary">
  //                 Ok, I got it.
  //             </Button>
  //         </div>
  //     </Alert>
  // }
  return <Fragment/>
}

export default AlertContainer;
