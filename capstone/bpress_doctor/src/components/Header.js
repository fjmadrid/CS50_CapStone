import React, { Component } from "react";
import LoginLogoutModal from "./LoginLogoutModal"
import CreateSelectPatient from "./CreateSelectPatient";
class Header extends Component {

  render() {    
    if (this.props.state.doctor.username==="")
    return (      
      <div className="container">
        <div className="row">
          <div className="col-11">            
            <h1>Blood Pressure Control Assistant</h1>
          </div>
          <div className="col-1">
            <LoginLogoutModal state={this.props.state}
              setState={(s)=>{this.props.setState(s)}} />
          </div>
        </div>
      </div>
    );
    else
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">            
            <h1>Blood Pressure Control Assistant</h1>
          </div>
          <div className="col-2">
            <CreateSelectPatient state={this.props.state}
                setState={(s) => {this.props.setState(s)}}/>
          </div>
          <div className="col-1">
            <LoginLogoutModal state={this.props.state}
              setState={(s)=>{this.props.setState(s)}} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
