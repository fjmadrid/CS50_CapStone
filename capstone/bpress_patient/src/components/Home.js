import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import MeasurementList from "./MeasurementList";
import MessageList from "./MessageList";
import "./Home.css";
class Home extends Component {

  render() {
    return (
      <Container className="home d-flex flex-md-row flex-sm-column">
      <div>
              <MeasurementList/>
      </div>
      <div>
              <MessageList
                patient={this.props.patient}
                doctor={this.props.doctor}
              />
      </div>
      </Container>
    );
  }
}

export default Home;