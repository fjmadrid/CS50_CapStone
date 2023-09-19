import React, { Component } from "react";
import {LoginLogoutModal} from ".components/LoginLogoutModal"
class Header extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-11 text-center">
            <img
              src="https://logrocket-assets.io/img/logo.png"
              width="300"
              className="img-thumbnail"
              style={{ marginTop: "20px" }}
            />
            <hr />
            <h5>
              <i>presents</i>
            </h5>
            <h1>App with React + Django</h1>
          </div>
          <div className="col-1">
            <LoginLogoutModal state={this.props.state}
              setState={this.props.setState} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
