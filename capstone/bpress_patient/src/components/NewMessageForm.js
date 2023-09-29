import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewMessageForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {text: ""};    
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createMessage = e => {
    e.preventDefault();
    axios.post(API_URL+'patient/message/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };
  
  render() {
    return (
      <Form onSubmit={this.createMessage}>
        <FormGroup>
          <Label for="text">Message:</Label>
          <Input
            type="text"
            name="text"
            onChange={this.onChange}
            value={this.state.text}
            placeholder="Write your message"
          />
        </FormGroup>        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewMessageForm; 