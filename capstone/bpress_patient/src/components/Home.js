import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import MeasurementList from "./MeasurementList";
import NewMeasurementModal from "./NewMeasurementModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    measurements: []
  };

  componentDidMount() {
    this.resetState();
  }

  getMeasurements = () => {
    axios.get(API_URL + 'patient/measurement/').then(res => this.setState({ measurements: res.data }));
  };

  resetState = () => {
    this.getMeasurements();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col className="col-7">
            <Container style={{ marginTop: "20px" }}>
              <Row>
                <Col>
                  <NewMeasurementModal create={true} resetState={this.resetState} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <MeasurementList
                    measurements={this.state.measurements}
                    resetState={this.resetState}
                  />
                </Col>
              </Row>        
            </Container>
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