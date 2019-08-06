import React from "react";
import "./App.css";
import "./toolkit-core.min.css";
import "./login.css";
import Navbar from "./Components/Navbar.jsx";
import Main from "./Components/Main";
import RegistrationForm from "./Components/RegistrationForm.jsx";
import LoginForm from "./Components/LoginForm";
import { Router } from "@reach/router";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "react-datepicker";
import CurrentLocation from "./Components/CurrentMapLocation";
import MapContainer from "./Components/Map";
// import ErrorPage from "./Components/ErrorPage.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Main path="/" />
        <RegistrationForm path="register" />
        <LoginForm path="login" />
        <Main path="error" />
      </Router>
    </div>
  );
}

export default App;
