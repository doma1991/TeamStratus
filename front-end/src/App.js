import React from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import SearchBar from "./SearchBar";
import MapContainer from './Map';
import CurrentLocation from './CurrentMapLocation';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <MapContainer />
      {/* <RegistrationForm /> */}
    </div>
  );
}

export default App;
