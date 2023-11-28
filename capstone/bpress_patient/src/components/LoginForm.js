import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

function LoginForm(props) {

  var [state, setState] = useState({username: "", password: ""});

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value });
  };

  const login = async (e) => {    
    e.preventDefault();
    
    var patient = { id:0, username:""};
    var doctor = {id:0, username:""};
    
    const resp1 = await axios.post(API_URL+'authentication/login/', state);

    if (resp1.status === 200) {

      const key = resp1.data['key'];        
      axios.defaults.headers.common['Authorization'] = `Token ${key}`;

      const resp2 = await axios.get(API_URL+'patient/', state);

      if (resp2.status === 200) {

        patient = resp2.data['user'];
        
        const resp3 = await axios.get(API_URL+'patient/doctor');

        if (resp3.status === 200) {

          doctor = resp3.data;
          props.setState({patient:patient, doctor:doctor});
          props.toggle();

        } else {
          console.log(`Error ${resp3.status} getting doctor: ${resp3.error}`);
        }
      } else {
        console.log(`Error ${resp2.status} getting patient: ${resp2.error}`);
      }
    } else {
      console.log(`Error ${resp1.status} getting token: ${resp1.error}`);
    }
  };
  
  return (
    <Form onSubmit={login}>
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
      <Button>Login</Button>
    </Form>
  );
}

export default LoginForm;