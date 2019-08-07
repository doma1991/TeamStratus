import React from "react";
// import RegistrationForm from "./RegistrationForm.jsx";
// import LoginForm from "./LoginForm";
// import { Switch, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import PopularWeather from "./PopularWeather";
import TopFiveFlights from "./TopFiveFlights";

class Main extends React.Component {
  render() {
    return (
      <main>
        <SearchBar loggedIn={this.props.loggedIn} />
        <h3>Weather testing</h3>
        <PopularWeather />
        <TopFiveFlights />
      </main>
    );
  }
}

export default Main;
