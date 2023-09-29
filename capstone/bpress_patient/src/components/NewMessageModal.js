import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewMessageForm from "./NewMessageForm";

class NewMessageModal extends Component {
  
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
    return (
      <Fragment>
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          New
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>New message</ModalHeader>
          <ModalBody>
            <NewMessageForm
              resetState={this.props.resetState}
              toggle={this.toggle}              
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewMessageModal;