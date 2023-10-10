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
      return (
        <div className="d-flex p-5">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} direction="down">
                <DropdownToggle color="primary" caret>Select patient</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem key="0" onClick={this.createPatient}>Add new patient</DropdownItem>
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
                <ModalHeader toggle={this.toggle}>Create new patient</ModalHeader>
                <ModalBody>
                    <CreatePatientForm
                        state={this.props.state}
                        setState={(s)=>{this.props.setState(s)}}
                        toggle={this.toggle}
                    />
                </ModalBody>
            </Modal>
        </div>
      );
    }
}   

export default CreateSelectPatient;
