import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import {PaginationControl} from "react-bootstrap-pagination-control";
import NewMeasurementModal from "./NewMeasurementModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import Dayjs from "dayjs";


import axios from "axios";
import { API_URL } from "../constants";

function MeasurementList(props) {
  
  var [state, setState] = useState({page:1, count:0, measurements:[]});

  useEffect(() => {
    this.getMeasurements(1);
  }, []);

  const getMeasurements = (page=1) => {
    axios.get(API_URL + `patient/measurement/?page=${page}`).then(
      res => {
        setState({
          measurements: res.data.results,
          count:res.data.count,
          page: page,
      });
    })
  };
  
  const resetState = () => {
    getMeasurements(state.page);
  };
      
  return (
    <Container style={{marginTop:"10px", backgroundColor:"lightblue"}}>
      <Row>
        <Col><h1 style={{textAlign: "center"}}>Measurements</h1></Col>
      </Row>        
      <Row style={{height:"538px"}}>
        <Table striped responsive className="table-primary" style={{overflowY:"scroll", maxHeight:"485px",
          whiteSpace:"nowrap"}}>
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
            {!state.measurements || state.measurements.length <= 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  <b>Ops, no one here yet</b>
                </td>
              </tr>
            ) : (
              state.measurements.map(measurement => (
                <tr key={measurement.id}>
                  <td>{Dayjs(measurement.date).format('DD/MM/YY H:mm')}</td>
                  <td>{measurement.systolic}</td>
                  <td>{measurement.diastolic}</td>
                  <td>{measurement.ppm}</td>
                  <td>{measurement.observation}</td>                
                  <td align="center">
                    <NewMeasurementModal
                      create={false}
                      measurement={measurement}
                      resetState={resetState}
                    />
                    &nbsp;&nbsp;
                    <ConfirmRemovalModal                        
                      id={measurement.id}
                      resetState={resetState}                        
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>          
      </Row>
      <Row>        
        <Col className="col-1">
        <NewMeasurementModal create={true} resetState={resetState} />
        </Col>
        <Col>      
          <PaginationControl
            page={state.page}
            between={4}
            total={state.count}
            limit={10}
            changePage={(p)=>getMeasurements(p)}
            ellipsis={1}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default MeasurementList;