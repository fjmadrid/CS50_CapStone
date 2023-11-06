import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewMeasurementForm from "./NewMeasurementForm";

class NewMeasurementModal extends Component {
  
  constructor(props) {
    super(props)
    this.state = {modal: false};    
  }

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Measurement";
    var button = <Button className="btn-sm" onClick={this.toggle}><FontAwesomeIcon icon={faPenToSquare} /></Button>;
    if (create) {
      title = "Creating New Measurement";

      button = (
        <Button
          color="primary"          
          onClick={this.toggle}          
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewMeasurementForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              measurement={this.props.measurement}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewMeasurementModal;