import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
// import RegistrationForm from "./Components/RegistrationForm.jsx";
import LoginForm from "./Components/LoginForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <RegistrationForm /> */}
      <LoginForm />
    </div>
  );
}

export default App;
