import React, { Component } from "react";
import LoginLogoutModal from "./LoginLogoutModal"
class Header extends Component {

  render() {    
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
  }
}

export default Header;
