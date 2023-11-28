import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";

import { API_URL } from "../constants";

function ConfirmRemovalModal(props) {
  const [state, setState] = useState({ modal: false });

  const toggle = () => {
    setState({ modal: !state.modal });
  };

  const deleteMeasurement = (id) => {
    axios.delete(API_URL + "patient/measurement/" + id).then(() => {
      props.resetState();
      toggle();
    });
  };

  return (
    <>
      <Button className="btn-sm" color="danger" onClick={toggle}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Do you really wanna delete the measurement?
        </ModalHeader>

        <ModalFooter>
          <Button type="button" onClick={toggle}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deleteMeasurement(props.id)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ConfirmRemovalModal;
