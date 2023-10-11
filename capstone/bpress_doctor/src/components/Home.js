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
          <Col className="col-7">
            <Row>
              <MeasurementList patient={this.props.patient}/>
            </Row>
          </Col>
          <Col>
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