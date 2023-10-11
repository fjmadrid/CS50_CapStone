import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

import { API_URL } from "../constants";
import LoginForm from "./LoginForm";
import "./LoginLogoutModal.css";

class LoginLogoutModal extends Component {

  constructor(props) {
    super(props);
    this.state = {modal: false};
  }

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  logout = e => {    
    e.preventDefault();
    axios.post(API_URL+'authentication/logout/').then((response) => {
        axios.defaults.headers.common['Authorization'] = '';
        this.props.setState ({
          patient:{id:0, username:""},
          doctor:{id:0, username:""}
      });
    });
  }

  render() {

    var button = <Button 
      className="button_logout"
      onClick={this.logout}>
        Logout
      </Button>;

    if (this.props.state.doctor.username === "") {
      button = (
        <Button
          color="primary"
          className="button_login"
          onClick={this.toggle}          
        >
        Login
        </Button>
      );
    }

    
    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <LoginForm
              state={this.props.state}
              setState={(s)=>{this.props.setState(s)}}
              toggle={this.toggle}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default LoginLogoutModal;