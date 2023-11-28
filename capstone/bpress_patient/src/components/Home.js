import React from "react";
import { Container } from "reactstrap";
import MeasurementList from "./MeasurementList";
import MessageList from "./MessageList";

function Home(props) {
  return (
    <Container className="d-flex flex-md-row flex-sm-column"
      style={{ gap: "10px", height: "614px" }}>
      <div className="w-100">
        <MeasurementList />
      </div>
      <div>
        <MessageList
          patient={props.patient}
          doctor={props.doctor}
        />
      </div>
    </Container>
  );
}

export default Home;