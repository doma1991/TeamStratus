import React, { Component } from "react";
import { Link } from "@reach/router";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.removeItem("jwt");
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
            >
              Register
            </Link>
          ) : (
            ""
          )}
          {!this.props.loggedIn ? (
            <Link
              to="/login"
              className="btn btn-outline-primary my-2 my-sm-0 mx-1"
            >
              Login
            </Link>
          ) : (
            ""
          )}
          {this.props.loggedIn ? (
            <button
              onClick={this.logout}
              className="btn btn-outline-primary my-2 my-sm-0 mx-1"
            >
              Log Out
            </button>
          ) : (
            ""
          )}
        </div>
      </nav>
    );
  }
}
export default Navbar;
