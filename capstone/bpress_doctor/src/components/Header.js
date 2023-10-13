import React, { Component } from "react";
import { Container, Row, Col} from "reactstrap";
import LoginLogoutModal from "./LoginLogoutModal"
import CreateSelectPatient from "./CreateSelectPatient";
import  "./Header.css";
class Header extends Component {

  render() {    
    if (this.props.state.doctor.username==="")
    return (      
      <Container className="header">
        <Row></Row>
        <Row className="header_title mt-3">
            <h1>Blood Pressure Control Assistant</h1>
        </Row>
        <Row className="mt-3">
          <Col className="col-1">
            <LoginLogoutModal state={this.props.state}
              setState={(s)=>{this.props.setState(s)}} />
          </Col>
        </Row>
      </Container>
    );
    else
    return (
      <Container className="header">
        <Row></Row>
        <Row className="header_title mt-3">
            <h1>Blood Pressure Control Assistant</h1>
        </Row>
        <Row className="mt-3">
          <Col className="col-auto">
            <LoginLogoutModal state={this.props.state}
              setState={(s)=>{this.props.setState(s)}} />
          </Col>
          <Col className="col-auto">
            <CreateSelectPatient state={this.props.state}
                setState={(s) => {this.props.setState(s)}}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
