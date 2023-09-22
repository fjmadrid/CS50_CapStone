import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewMeasurementForm extends React.Component {
  
  constructor(props) {
    super(props);
    var now = new Date();
    console.log('NewMeasurementForm.constructor this.props.measurement: ',this.props.measurement);
    if (this.props.measurement) {
      this.state = this.props.measurement;
    }
    else {
      this.state = {
        id: 0,
        diastolic: 0,
        systolic: 0,
        ppm: 0,
        date: now.toISOString(),
        observation: "",
      };
    }
    console.log('NewMeasurementForm.constructor this.state: ',this.state);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createMeasurement = e => {
    e.preventDefault();
    axios.post(API_URL+'patient/measurement/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editMeasurement = e => {
    e.preventDefault();
    axios.put(API_URL+'patient/measurement/'+ this.state.id + '/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };
  
  render() {
    return (
      <Form onSubmit={this.props.measurement ? this.editMeasurement : this.createMeasurement}>
        <FormGroup>
          <Label for="systolic">Systolic (upper):</Label>
          <Input
            type="number"
            name="systolic"
            onChange={this.onChange}
            value={this.state.systolic}
          />
        </FormGroup>
        <FormGroup>
          <Label for="diastolic">diastolic (lower):</Label>
          <Input
            type="number"
            name="diastolic"
            onChange={this.onChange}
            value={this.state.diastolic}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ppm">PPM:</Label>
          <Input
            type="number"
            name="ppm"
            onChange={this.onChange}
            value={this.state.ppm}
          />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date:</Label>
          <Input
            type="datetime-local"
            name="date"
            onChange={this.onChange}
            value={this.state.date}
          />
        </FormGroup>
        <FormGroup>
          <Label for="observation">Observation:</Label>
          <Input
            type="text"
            name="observation"
            onChange={this.onChange}
            value={this.state.observation}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewMeasurementForm; 