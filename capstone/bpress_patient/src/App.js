import React, { useState } from "react";
import { Container, Row } from "reactstrap";

import Header from "./components/Header";
import Home from "./components/Home";

function App () {

  var [state, setState] = useState({
    patient: {id:0, username:""},
    doctor: {id:0, username:""}}
  );

  if (state.patient.username === "") {
    return (
      <>          
        <Header state={state} setState={setState} />          
        <Container className="text-center">
          <Row>
            <h1>Opps! you must login!!</h1>
          </Row>
        </Container>            
      </>
    );
  } else {
    return (
      <>
        <Header state={state} setState={setState} />      
        <Home patient={state.patient} doctor={state.doctor}/>
      </>
    );
  }
}

export default App;