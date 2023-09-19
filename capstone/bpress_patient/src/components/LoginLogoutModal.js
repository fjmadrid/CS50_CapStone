import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

import { API_URL } from "../constants";
import {LoginForm} from "./components/LoginForm";


class LoginLogoutModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };
  
  render() {
    logout = e => {
        e.preventDefault();
        axios.post(API_URL+'authenticate/logout').then(() => {
            axios.defaults.headers.common['Authorization'] = '';
            this.props.setState ({user:"", token:""});
        });
    }

    var button = <Button onClick={this.logout}>Logout</Button>;
    if (this.props.state.token === '') {
      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
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
              setState={this.props.setState}
              toggle={this.toggle}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default LoginLogoutModal;