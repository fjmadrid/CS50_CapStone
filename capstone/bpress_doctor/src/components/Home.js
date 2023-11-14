import React, { Component } from "react";
import { Container } from "reactstrap";
import MeasurementList from "./MeasurementList";
import MessageList from "./MessageList";

class Home extends Component {
  
  render() {
    return (
      <Container className="d-flex flex-md-row flex-sm-column" 
        style={{gap:"10px", height:"614px"}}>
        <div>
          <MeasurementList patient={this.props.patient}/>
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