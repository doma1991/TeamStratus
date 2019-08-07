import React from "react";
// import RegistrationForm from "./RegistrationForm.jsx";
// import LoginForm from "./LoginForm";
// import { Switch, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import PopularWeather from "./PopularWeather";
import FlightsView from "./FlightView";

class Main extends React.Component {
  render() {
    return (
      <main>
        <SearchBar />
        <h3>Weather testing</h3>
        <PopularWeather />
        <h4>Flights to your favourite programme locations</h4>
        <FlightsView />
      </main>
    );
  }
}

export default Main;
