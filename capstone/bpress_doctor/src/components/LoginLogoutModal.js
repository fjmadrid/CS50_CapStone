import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

import { API_URL } from "../constants";
import LoginForm from "./LoginForm";
import "./LoginLogoutModal.css";

function LoginLogoutModal(props) {
  var [state, setState] = useState({ modal: false });

  const toggle = () => {
    setState({ modal: !state.modal });
  };

  const logout = (e) => {
    axios.post(API_URL + "authentication/logout/").then((response) => {
      axios.defaults.headers.common["Authorization"] = "";
      props.setState({
        patients: [],
        patient: { id: 0, username: "" },
        doctor: { id: 0, username: "" },
      });
    });
  };

  var button = (
    <Button className="button_logout" onClick={logout}>
      Logout
    </Button>
  );

  if (props.state.doctor.username === "") {
    button = (
      <Button color="primary" className="button_login" onClick={toggle}>
        Login
      </Button>
    );
  }

  return (
    <>
      {button}
      <Modal isOpen={state.modal} toggle={toggle}>
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
