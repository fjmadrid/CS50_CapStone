import React, { Component, Fragment } from "react";


import Header from "./components/Header";
import Home from "./components/Home";
import axios from "axios";
class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = { username:"", token:"" };
    axios.defaults.headers.common['Authorization'] = "";
  }

  render() {
    console.log("Rendering app")
    console.log("App.state: ", this.state)
    if (this.state.username === "") {
      return (
        <Fragment>          
          <Header state={this.state} setState={(s)=>{this.setState(s)}} />          
          <div className="text-center">
            <h1>Opps! you must login!!</h1>
          </div>            
        </Fragment>
      );
    } else {
      return (
        <Fragment>
        <Header state={this.state} setState={(s)=>{this.setState(s)}} />      
        <Home />
        </Fragment>
      );
    }          
  }
}

export default App;