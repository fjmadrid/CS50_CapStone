import React, { Component, Fragment } from "react";


import Header from "./components/Header";
import Home from "./components/Home";

class App extends Component {
  state = { username:"", token:"" }  
  render() {
    return (
      <Fragment>
        <Header state={this.state} setState={this.setState} />
        if (this.state.token !== '') {
          <Home />
        }
        else {
          <div className="text-center">
            <h1>Opps! you must login!!</h1>
          </div>
        }
      </Fragment>
    );
  }
}

export default App;