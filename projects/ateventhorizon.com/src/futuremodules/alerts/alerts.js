import React, {Fragment} from "react";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import {getRandomMovieQuote} from "../warningsmoviequotes/warningMovieQuotes";
import {useGlobal} from "reactn";

export const ConfirmAlert = 'confirmAlert';
export const NotificationAlert = 'notificationAlert';

export const EHAlert = () => {

  const [confirmAlert, setConfirmAlert] = useGlobal(ConfirmAlert);
  const [notificationAlert, setNotificationAlert] = useGlobal(NotificationAlert);

  if (confirmAlert) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onClose={() => {
          setConfirmAlert(null).then();
        }}>
        {confirmAlert.title && <Modal.Header closeButton>
          <Modal.Title>{confirmAlert.title}</Modal.Title>
        </Modal.Header>}
        <Modal.Body>{confirmAlert.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setConfirmAlert(null)}>
            {confirmAlert.noText}
          </Button>
          <Button variant={confirmAlert.yesType} onClick={confirmAlert.yesCallback}>
            {confirmAlert.yesText}
          </Button>
        </Modal.Footer>
      </Modal>)
  }

  if (notificationAlert) {
    const centered = {
      position: 'absolute',
      top: "50%",
      left: "50%",
      // marginTop: "-50px",
      marginLeft: "-45%",
      width: "90%",
    }
    const outlineVariant = "outline-secondary";
    return (
      <div style={centered}>
        <Alert key={notificationAlert.title} variant={notificationAlert.alertType}
               onClose={() => {
                 setNotificationAlert(null).then();
               }} dismissible>
          {notificationAlert.title && <Alert.Heading>{notificationAlert.title}</Alert.Heading>}
          {notificationAlert.text}
          <div className="d-flex justify-content-end">
            <Button onClick={() => setNotificationAlert(null).then()} variant={outlineVariant}>
              Alright...
            </Button>
          </div>
        </Alert>
      </div>
    )
  }

  return <Fragment/>
}

export const useAlertWarning = (title) => {

  const [,store] = useGlobal(NotificationAlert);

  store({
    title: title,
    text: getRandomMovieQuote(),
    alertType: "warning"
  }).then();

}

export const alertWarning = (store, title) => {

  store({
    title: title,
    text: getRandomMovieQuote(),
    alertType: "warning"
  }).then();

}
