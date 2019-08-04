import React from "react";
const Navbar = () => {
  return (
    <nav className="navbar d-flex flex-row justify-content-between navbar-dark">
      <div className="mob-logo">
        <a
          href="https://www.sky.com"
          className="mast-c-header__logo mast-js-focus"
          data-tracking-label="masthead_home_logo"
        >
          <i className="fas fa-bars" />
        </a>

        <span className="navbar-brand mb-0 h1">GetYourWay</span>
      </div>
      <div className="main-logo">
        <a
          href="https://www.sky.com"
          className="mast-c-header__logo mast-js-focus"
          data-tracking-label="masthead_home_logo"
        />

        <span className="navbar-brand mb-0 h1">GetYourWay</span>
      </div>

      <div>
        <button
          className="btn btn-outline-primary my-2 my-sm-0"
          type="register"
        >
          Register
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
