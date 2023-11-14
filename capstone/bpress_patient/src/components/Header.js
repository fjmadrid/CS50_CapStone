import React, { Component } from "react";
import { Container, Row, Col} from "reactstrap";
import LoginLogoutModal from "./LoginLogoutModal"

class Header extends Component {

  render() {    
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
            <LoginLogoutModal state={this.props.state}
              setState={(s)=>{this.props.setState(s)}} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
