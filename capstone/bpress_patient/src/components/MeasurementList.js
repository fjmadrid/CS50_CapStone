import React, { Component } from "react";
import { Table } from "reactstrap";
import NewMeasurementModal from "./NewMeasurementModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class MeasurementList extends Component {
  render() {
    const measurements = this.props.measurements;
    return (
      <Table dark>
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
              <td colSpan="5" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            measurements.map(measurement => (
              <tr key={measurement.id}>
                <td>{measurement.date}</td>
                <td>{measurement.systolic}</td>
                <td>{measurement.diastolic}</td>
                <td>{measurement.ppm}</td>
                <td>{measurement.observation}</td>                
                <td align="center">
                  <NewMeasurementModal
                    create={false}
                    measurement={measurement}
                    resetState={()=>{this.props.resetState()}}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    id={measurement.id}
                    resetState={()=>{this.props.resetState()}}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default MeasurementList;