import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

function NewMeasurementForm(props) {
  const now = new Date();
  const [state, setState] = useState(props.measurement ? props.measurement : {
    id: 0,
    diastolic: 0,
    systolic: 0,
    ppm: 0,
    date: now.toISOString(),
    observation: "",
  });
  
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const createMeasurement = (e) => {
    e.preventDefault();
    axios.post(API_URL + "patient/measurement/", state).then(() => {
      props.resetState();
      props.toggle();
    });
  };

  const editMeasurement = (e) => {
    e.preventDefault();
    axios
      .put(API_URL + "patient/measurement/" + state.id + "/", state)
      .then(() => {
        props.resetState();
        props.toggle();
      });
  };

  return (
    <Form onSubmit={props.measurement ? editMeasurement : createMeasurement}>
      <FormGroup>
        <Label for="systolic">Systolic (upper):</Label>
        <Input
          type="number"
          name="systolic"
          onChange={onChange}
          value={state.systolic}
        />
      </FormGroup>
      <FormGroup>
        <Label for="diastolic">diastolic (lower):</Label>
        <Input
          type="number"
          name="diastolic"
          onChange={onChange}
          value={state.diastolic}
        />
      </FormGroup>
      <FormGroup>
        <Label for="ppm">PPM:</Label>
        <Input type="number" name="ppm" onChange={onChange} value={state.ppm} />
      </FormGroup>
      <FormGroup>
        <Label for="date">Date:</Label>
        <Input
          type="datetime-local"
          name="date"
          onChange={onChange}
          value={state.date.substring(0, 16)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="observation">Observation:</Label>
        <Input
          type="text"
          name="observation"
          onChange={onChange}
          value={state.observation}
        />
      </FormGroup>
      <Button>Send</Button>
    </Form>
  );
}

export default NewMeasurementForm;
