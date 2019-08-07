import React from "react";
import "./App.css";
import "./toolkit-core.min.css";
import "./login.css";
import Navbar from "./Components/Navbar.jsx";
import Main from "./Components/Main";
import RegistrationForm from "./Components/RegistrationForm.jsx";
import LoginForm from "./Components/LoginForm";
import { Router, Redirect } from "@reach/router";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "react-datepicker";
import CurrentLocation from "./Components/CurrentMapLocation";
import MapContainer from "./Components/Map";
import { Link } from "@reach/router";

// import ErrorPage from "./Components/ErrorPage.jsx";
console.log(process.env.REACT_APP_GOOGLE_API);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      button: (
        <Link to="/login" className="btn btn-outline-primary my-2 my-sm-0 mx-1">
          Login
        </Link>
      )
    };
    this.checkLogin = this.checkLogin.bind(this);
  }
  checkLogin() {
    if (sessionStorage.getItem("jwt") !== null) {
      this.setState({ loggedIn: true });
      this.setState({
        button: (
          <Link
            to="/"
            onClick="logout()"
            className="btn btn-outline-primary my-2 my-sm-0 mx-1"
          >
            LogOut
          </Link>
        )
      });
    } else {
      this.setState({
        button: (
          <Link
            to="/login"
            className="btn btn-outline-primary my-2 my-sm-0 mx-1"
          >
            Login
          </Link>
        )
      });
      this.setState({ loggedIn: false });
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar
          button={this.state.button}
          checkLogin={this.checkLogin}
          loggedIn={this.state.loggedIn}
        />
        <Router>
          <Main path="/" />
          <RegistrationForm path="register" />
          <LoginForm checkLogin={this.checkLogin} path="login" />
          <Main path="error" />
        </Router>
      </div>
    );
  }
}

export default App;
