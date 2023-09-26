import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import MeasurementList from "./MeasurementList";

class Home extends Component {

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col className="col-7">
            <MeasurementList/>
          </Col>
          <Col>
            <Container>
              <Row>
                <h1>Chat</h1>
              </Row>
            </Container>
          </Col> 
        </Row>
      </Container>
    );
  }
}

export default Home;