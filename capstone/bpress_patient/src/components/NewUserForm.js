import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewUserForm extends React.Component {
    
  state = {
    pk : 0,     
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    weight: 0,
    height: 0,
    birth_date: "",
  };

  componentDidMount() {
    if (this.props.user) {
      const { pk, username, password, email, first_name, last_name, weight, height, birth_date } = this.props.user;
      this.setState({ pk, username, password, email, first_name, last_name, weight, height, birth_date });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createUser = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editUser = e => {
    e.preventDefault();
    axios.put(API_URL+ this.state.pk + '/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };
  
  render() {
    return (
      <Form onSubmit={this.props.user ? this.editUser : this.createUser}>
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
          <Label for="password">Password:</Label>
          <Input
            type="password"
            name="password"
            onChange={this.onChange}
            value={this.state.password}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ppm">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.state.email}
          />
        </FormGroup>
        <FormGroup>
          <Label for="first_name">First name:</Label>
          <Input
            type="text"
            name="first_name"
            onChange={this.onChange}
            value={this.state.first_name}
          />
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last name:</Label>
          <Input
            type="text"
            name="last_name"
            onChange={this.onChange}
            value={this.state.last_name}
          />
        </FormGroup>
        <FormGroup>
          <Label for="weight">Weight (kg):</Label>
          <Input
            type="number"
            name="weight"
            onChange={this.onChange}
            value={this.state.weight}
          />
        </FormGroup>
        <FormGroup>
          <Label for="height">Height (cm):</Label>
          <Input
            type="number"
            name="height"
            onChange={this.onChange}
            value={this.state.height}
          />
        </FormGroup>
        <FormGroup>
          <Label for="birth_date">Birth date:</Label>
          <Input
            type="date"
            name="birth_date"
            onChange={this.onChange}
            value={this.state.birth_date}
          />
        </FormGroup>        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewUserForm;