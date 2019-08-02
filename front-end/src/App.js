import React from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import SearchBar from "./SearchBar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <RegistrationForm />
    </div>
  );
}

export default App;
