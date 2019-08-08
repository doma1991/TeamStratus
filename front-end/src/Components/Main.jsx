import React from "react";
// import RegistrationForm from "./RegistrationForm.jsx";
// import LoginForm from "./LoginForm";
// import { Switch, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import PopularWeather from "./PopularWeather";
import TopFiveFlights from "./TopFiveFlights";

// import FlightsView from "./FlightView";

class Main extends React.Component {
  render() {
    return (
      <main>
        <SearchBar loggedIn={this.props.loggedIn} />

        <h3 className="weather-header">Discover</h3>
        <PopularWeather />
        <h3 className="weather-header">Be inspired</h3>
        <TopFiveFlights />

        {/* <FlightsView /> */}
      </main>
    );
  }
}

export default Main;
