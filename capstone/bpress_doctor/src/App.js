import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";

import Header from "./components/Header";
// import Home from "./components/Home";
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      patients : [],
      patient: {id:0, username:""},
      doctor: {id:0, username:""}
    };
    axios.defaults.headers.common['Authorization'] = "";
  }

  render() {
    if (this.state.doctor.username === "") {
      return (
        <Fragment>          
          <Header state={this.state} setState={(s)=>{this.setState(s)}} />          
          <Container className="text-center">
            <Row>
              <h1>Opps! you must login!!</h1>
            </Row>
          </Container>            
        </Fragment>
      );
    } else {
      if (this.state.patient.username === "") {
        return (
          <Fragment>          
            <Header state={this.state} setState={(s)=>{this.setState(s)}} />          
            <Container className="text-center">
              <Row><h1>Opps! you must select a patient!!</h1></Row>
            </Container>            
          </Fragment>
      )} else  {
        return (
          <Fragment>
          <Header state={this.state} setState={(s)=>{this.setState(s)}} />      
{/*           <Home  
             patient={this.state.patient} 
             doctor={this.state.doctor} 
           /> */}
          </Fragment>
      )};
    }          
  }
}

export default App;