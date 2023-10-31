import React, { Component } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import {PaginationControl} from "react-bootstrap-pagination-control";
import NewMeasurementModal from "./NewMeasurementModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import Dayjs from "dayjs";


import axios from "axios";
import { API_URL } from "../constants";

class MeasurementList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      count: 0,    
      measurements: []
    };
  }

  componentDidMount() {
    this.getMeasurements(1);
  }

  range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }

  num_pages() {    
    return Math.ceil(this.state.count / 10)
  }

  getMeasurements = (page=1) => {
    axios.get(API_URL + `patient/measurement/?page=${page}`).then(
      res => {
        this.setState({
          measurements: res.data.results,
          count:res.data.count,
          page: page,
      });
    })
  };
  
  resetState = () => {
    this.getMeasurements(this.state.page);
  };

  render() {
    const measurements = this.state.measurements;    
    return (
      <Container style={{ marginTop: "10px" }}>
        <Row>
          <Col><h1 style={{textAlign: "center"}}>Measurements</h1></Col>
        </Row>        
        <Row style={{height:"500px"}}>
          <Container style={{overflowY:"scroll", maxHeight:"485px"}}>
          <Table >
            <thead>
              <tr>
                <th>Date</th>
                <th>Systolic</th>
                <th>Diastolic</th>
                <th>PPM</th>
                <th>Observation</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!measurements || measurements.length <= 0 ? (
                <tr>
                  <td colSpan="6" align="center">
                    <b>Ops, no one here yet</b>
                  </td>
                </tr>
              ) : (
                measurements.map(measurement => (
                  <tr key={measurement.id}>
                    <td>{Dayjs(measurement.date).format('MM/DD/YY H:mm')}</td>
                    <td>{measurement.systolic}</td>
                    <td>{measurement.diastolic}</td>
                    <td>{measurement.ppm}</td>
                    <td>{measurement.observation}</td>                
                    <td align="center">
                      <NewMeasurementModal
                        create={false}
                        measurement={measurement}
                        resetState={this.resetState}
                      />
                      &nbsp;&nbsp;
                      <ConfirmRemovalModal                        
                        id={measurement.id}
                        resetState={this.resetState}                        
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          </Container>
        </Row>
        <Row>        
          <Col className="col-1">
          <NewMeasurementModal create={true} resetState={this.resetState} />
          </Col>
          <Col>      
            <PaginationControl
              page={this.state.page}
              between={4}
              total={this.state.count}
              limit={10}
              changePage={(p)=>this.getMeasurements(p)}
              ellipsis={1}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MeasurementList;