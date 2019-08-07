import React, { Component } from "react";
import { Link } from "@reach/router";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  logout() {
    this.props.checkLogin();
  }

  render() {
    return (
      <nav className="navbar d-flex flex-row justify-content-between navbar-dark">
        <div className="mob-logo">
          <a href="/" className="mast-c-header__logo mast-js-focus" />

          <span className="navbar-brand mb-0 h1">GetYourWay</span>
        </div>
        <div className="main-logo">
          <Link to="/" className="mast-c-header__logo mast-js-focus" />


          <span className="navbar-brand mb-0 h1">GetYourWay</span>
        </div>

        <div>
          {!this.props.loggedIn ? (
            <Link
              to="/register"
              className="btn btn-outline-primary my-2 my-sm-0 mx-1"
              id = "navloginbutton"
            >
              Register
            </Link>
          ) : (
            ""
          )}

          {this.props.button}
        </div>
      </nav>
    );
  }
}

export default Navbar;
