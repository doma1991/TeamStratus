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
// import ErrorPage from "./Components/ErrorPage.jsx";
console.log(process.env.REACT_APP_GOOGLE_API);

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
