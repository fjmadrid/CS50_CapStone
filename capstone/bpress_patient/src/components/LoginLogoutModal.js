import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

import { API_URL } from "../constants";
import LoginForm from "./LoginForm";


function LoginLogoutModal (props) {

  var [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const logout = e => {    
    e.preventDefault();
    axios.post(API_URL+'authentication/logout/').then((response) => {
        axios.defaults.headers.common['Authorization'] = '';
        props.setState({patient:{id:0, username:""},
          doctor:{id:0, username:""}});
      });
  }

  var button = <Button onClick={logout}>Logout</Button>;

  if (props.state.patient.username === "") {
    button = (
      <Button
        color="primary"
        className="float-right"
        onClick={toggle}
        style={{ minWidth: "200px" }}
      >
      Login
      </Button>
    );
  }
  return (
    <>
      {button}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <LoginForm
            state={props.state}
            setState={props.setState}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </>
  );  
}

export default LoginLogoutModal;