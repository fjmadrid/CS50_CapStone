import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import MeasurementList from "./MeasurementList";
import MessageList from "./MessageList";
import "./Home.css";
class Home extends Component {

  render() {
    return (
      <Container className="home">
        <Row>
          <Col className="col-6">
            <Row>
              <MeasurementList/>
            </Row>
          </Col>
          <Col className="col-6">
            <Row>
              <MessageList
                patient={this.props.patient}
                doctor={this.props.doctor}
              />
            </Row>
          </Col> 
        </Row>
      </Container>
    );
  }
}

export default Home;