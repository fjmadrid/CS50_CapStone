import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import {PaginationControl} from "react-bootstrap-pagination-control";
import MeasurementList from "./MeasurementList";
import NewMeasurementModal from "./NewMeasurementModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    page: 1,
    count: 0,    
    measurements: []
  };

  componentDidMount() {
    this.resetState();
  }

  range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }

  num_pages() {    
    return Math.ceil(this.state.count / 10)
  }

  getMeasurements = () => {
    axios.get(API_URL + `patient/measurement/?page=${this.state.page}`).then(
      res => {
        this.setState({
          measurements: res.data.results,
          count:res.data.count
      });
    })
  };

  getPage = (page) => {
    console.log('Getting page: ', page)
    this.setState({page: page})
    this.resetState()
  }

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
              <Row>      
                <PaginationControl
                  page={this.state.page}
                  between={4}
                  total={this.state.count}
                  limit={10}
                  changePage={(p)=>this.getPage(p)}
                  ellipsis={1}
                />
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