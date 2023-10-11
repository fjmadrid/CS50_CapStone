import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class CreatePatientForm extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      username: "",
      password: "",
      birthdate: "",
      weight: 0,
      height: 0,
    };    
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  

  createPatient = e => {
    e.preventDefault();        
    axios.post(API_URL+'doctor/patient/', this.state).then( resp => {
        const new_patient = resp.data;
        var new_patients= this.props.state.patients;
        new_patients.push(new_patient);
        this.props.setState({patient:new_patient, patients:new_patients});
        this.props.toggle();
    });
  }
  
  render() {
    return (
      <Form onSubmit={this.createPatient}>
        <FormGroup>
          <Label for="username">Username:</Label>
          <Input
            type="text"
            name="username"
            onChange={this.onChange}
            value={this.state.username}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            onChange={this.onChange}
            value={this.state.password}
          />
        </FormGroup>
        <FormGroup>
          <Label for="birthdate">Birthday date</Label>
          <Input
            type="date"
            name="birthdate"
            onChange={this.onChange}
            value={this.state.birthdate}
          />
        </FormGroup>
        <FormGroup>
          <Label for="weight">Weight (cm)</Label>
          <Input
            type="number"
            name="weight"
            min="1"
            onChange={this.onChange}
            value={this.state.weight}
          />
        </FormGroup>
        <FormGroup>
          <Label for="height">Weight (kg)</Label>
          <Input
            type="number"
            name="height"
            min="1"
            onChange={this.onChange}
            value={this.state.height}
          />
        </FormGroup>
        <Button>Create</Button>
      </Form>
    );
  }
}

export default CreatePatientForm;