import React, { Component } from "react";

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

class CreateSelectPatient extends Component {

    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }

    toggle = () => {
        this.setState(previous => ({
            dropdownOpen: !previous.dropdownOpen
          }));
    };
    
    createPatient = () => {}
    
    selectPatient = (patient) => {
        console.log("Setting patient.");
        this.props.setState({patient:patient});     
    }

    render() {
      return (
        <div className="d-flex p-5">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction="down">
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
        </div>
      );
    }
}   

export default CreateSelectPatient;
