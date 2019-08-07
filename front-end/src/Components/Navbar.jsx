import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  // if (sessionStorage.getItem('jwt') === null) {

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
        <Link
          to="/register"
          className="btn btn-outline-primary my-2 my-sm-0 mx-1"
        >
          Register
        </Link>
        <Link to="/login" className="btn btn-outline-primary my-2 my-sm-0 mx-1">
          Login
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
