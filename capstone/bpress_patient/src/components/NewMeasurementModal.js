import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewMeasurementForm from "./NewMeasurementForm";

function NewMeasurementModal(props) {
  var [state, setState] = useState({ modal: false });

  const toggle = () => {
    setState({ modal: !state.modal });
  };

  var title = "Editing Measurement";
  var button = (
    <Button className="btn-sm" onClick={toggle}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </Button>
  );

  if (props.create) {
    title = "Creating New Measurement";
    button = (
      <Button color="primary" onClick={toggle}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    );
  }

  return (
    <>
      {button}
      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <NewMeasurementForm
            resetState={props.resetState}
            toggle={toggle}
            measurement={props.measurement}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default NewMeasurementModal;
