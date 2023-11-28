import React from "react";
import { Container, Row, Col } from "reactstrap";
import LoginLogoutModal from "./LoginLogoutModal";
import CreateSelectPatient from "./CreateSelectPatient";

function Header(props) {
  if (props.state.doctor.username === "")
    return (
      <Container style={{ backgroundColor: "darkblue", height: "154px" }}>
        <Row></Row>
        <Row className="mt-3">
          <h1
            style={{
              textAlign: "center",
              color: "brown",
              fontWeight: "bolder",
            }}
          >
            Blood Pressure Control Assistant
          </h1>
        </Row>
        <Row className="mt-3">
          <Col className="col-1">
            <LoginLogoutModal state={props.state} setState={props.setState} />
          </Col>
        </Row>
      </Container>
    );
  else
    return (
      <Container style={{ backgroundColor: "darkblue", height: "154px" }}>
        <Row></Row>
        <Row className="mt-3">
          <h1
            style={{
              textAlign: "center",
              color: "brown",
              fontWeight: "bolder",
            }}
          >
            Blood Pressure Control Assistant
          </h1>
        </Row>
        <Row className="mt-3">
          <Col className="col-auto">
            <LoginLogoutModal state={props.state} setState={props.setState} />
          </Col>
          <Col className="col-auto">
            <CreateSelectPatient
              state={props.state}
              setState={props.setState}
            />
          </Col>
        </Row>
      </Container>
    );
}

export default Header;
