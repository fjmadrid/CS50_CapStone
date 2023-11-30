import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import CreatePatientForm from "./CreatePatientForm";

function CreateSelectPatient(props) {
  let [dropdownOpen, setDropDownOpen] = useState(false);
  let [modal, setModal] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen((d) => !d);
  };

  const toggleModal = () => {
    setModal((m) => !m);
  };

  const selectPatient = (patient) => {
    props.setState({ ...props.state, patient: patient });
  };

  const button_text =
    props.state.patient.username === ""
      ? "Create/Select patient"
      : props.state.patient.username;

  return (
    <>
      <Dropdown
        className="mb-0"
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
        direction="down"
      >
        <DropdownToggle color="primary" caret>
          {button_text}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem key="0" onClick={toggleModal}>
            Create new patient
          </DropdownItem>
          <DropdownItem divider />
          {props.state.patients.map((patient) => {
            return (
              <DropdownItem
                key={patient.id}
                onClick={() => selectPatient(patient)}
                disabled={props.state.patient.id === patient.id}
              >
                {patient.username}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create new patient</ModalHeader>
        <ModalBody>
          <CreatePatientForm
            state={props.state}
            setState={props.setState}
            toggle={toggleModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default CreateSelectPatient;
