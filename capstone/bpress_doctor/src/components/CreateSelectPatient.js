import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import CreatePatientForm from "./CreatePatientForm";
class CreateSelectPatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            modal: false,
        };
    }

    toggleDropdown = () => {
        this.setState(previous => ({
            dropdownOpen: !previous.dropdownOpen
          }));
    };

    toggleModal = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }))
    }
    
    createPatient = () => {this.toggleModal(this.status)};
    
    selectPatient = (patient) => {
        this.props.setState({patient:patient});        
    }

    render() {
        const button_text = this.props.state.patient.username === "" ? 
            "Create/Select patient" : this.props.state.patient.username;
      return (
        <div>
            <Dropdown className="mb-0" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} direction="down">
                <DropdownToggle color="primary" caret>{button_text}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem key="0" onClick={this.createPatient}>Create new patient</DropdownItem>
                    <DropdownItem divider />
                    {this.props.state.patients.map(patient => {
                        return (
                            <DropdownItem key={patient.id} 
                                onClick={() => this.selectPatient(patient)}
                                disabled={this.props.state.patient.id===patient.id}>
                                    {patient.username}
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Create new patient</ModalHeader>
                <ModalBody>
                    <CreatePatientForm
                        state={this.props.state}
                        setState={(s)=>{this.props.setState(s)}}
                        toggle={this.toggleModal}
                    />
                </ModalBody>
            </Modal>
        </div>
      );
    }
}   

export default CreateSelectPatient;
