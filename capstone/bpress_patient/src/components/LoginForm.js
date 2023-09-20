import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class LoginForm extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      username: "",
      password: "",
    };    
  }

//  componentDidMount() {
//  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {    
    e.preventDefault();
    axios.post(API_URL+'authentication/login/', this.state).then((response) => {
        const key = response.data['key'];        
        axios.defaults.headers.common['Authorization'] = `Token ${key}`;                        
        this.props.setState({username:this.state.username, token:key});
        this.props.toggle();
    });
  };
  
  render() {
    return (
      <Form onSubmit={this.login}>
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
        <Button>Login</Button>
      </Form>
    );
  }
}

export default LoginForm;