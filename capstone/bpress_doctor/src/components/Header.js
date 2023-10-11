import React, { Component } from "react";
import LoginLogoutModal from "./LoginLogoutModal"
import CreateSelectPatient from "./CreateSelectPatient";
import  "./Header.css";
class Header extends Component {

  render() {    
    if (this.props.state.doctor.username==="")
    return (      
      <div className="container header">
        <div className="row header_title">
            <h1>Blood Pressure Control Assistant</h1>
        </div>
        <div className="row">
          <div className="col-1">
            <LoginLogoutModal state={this.props.state}
              setState={(s)=>{this.props.setState(s)}} />
          </div>
        </div>
      </div>
    );
    else
    return (
      <div className="container header">
        <div className="row header_title">
            <h1>Blood Pressure Control Assistant</h1>
        </div>
        <div className="row">
          <div className="col-auto">
            <LoginLogoutModal state={this.props.state}
              setState={(s)=>{this.props.setState(s)}} />
          </div>
          <div className="col-auto">
            <CreateSelectPatient state={this.props.state}
                setState={(s) => {this.props.setState(s)}}/>
          </div>          
        </div>
      </div>
    );
  }
}

export default Header;
