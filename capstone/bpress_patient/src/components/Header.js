import React from "react";
import { Container, Row, Col} from "reactstrap";
import LoginLogoutModal from "./LoginLogoutModal"

function Header(props) {
  return (
    <Container style={{backgroundColor:"darkblue", height:"154px"}}>
      <Row></Row>
      <Row className="mt-3">
          <h1 style={{textAlign:"center", color:"brown", 
            fontWeight:"bolder"}}>
              Blood Pressure Control Assistant
          </h1>
      </Row>
      <Row className="mt-3">
        <Col className="col-1">
          <LoginLogoutModal state={props.state}
            setState={props.setState} />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
