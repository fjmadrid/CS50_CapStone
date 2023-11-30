import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

function CreatePatientForm(props) {
  let [state, setState] = useState({
    username: "",
    password: "",
    birthdate: "",
    weight: 0,
    height: 0,
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const createPatient = (e) => {
    e.preventDefault();
    axios.post(API_URL + "doctor/patient/", state).then((resp) => {
      const new_patient = resp.data;
      let new_patients = props.state.patients;
      new_patients.push(new_patient);
      props.setState({
        ...props.state,
        patient: new_patient,
        patients: new_patients,
      });
      props.toggle();
    });
  };

  return (
    <Form onSubmit={createPatient}>
      <FormGroup>
        <Label for="username">Username:</Label>
        <Input
          type="text"
          name="username"
          onChange={onChange}
          value={state.username}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          onChange={onChange}
          value={state.password}
        />
      </FormGroup>
      <FormGroup>
        <Label for="birthdate">Birthday date</Label>
        <Input
          type="date"
          name="birthdate"
          onChange={onChange}
          value={state.birthdate}
        />
      </FormGroup>
      <FormGroup>
        <Label for="weight">Weight (cm)</Label>
        <Input
          type="number"
          name="weight"
          min="1"
          onChange={onChange}
          value={state.weight}
        />
      </FormGroup>
      <FormGroup>
        <Label for="height">Weight (kg)</Label>
        <Input
          type="number"
          name="height"
          min="1"
          onChange={onChange}
          value={state.height}
        />
      </FormGroup>
      <Button>Create</Button>
    </Form>
  );
}

export default CreatePatientForm;
