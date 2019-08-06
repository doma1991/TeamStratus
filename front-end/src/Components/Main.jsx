import React from "react";
// import RegistrationForm from "./RegistrationForm.jsx";
// import LoginForm from "./LoginForm";
// import { Switch, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import LocationSearchInput from "./AutocompleteSearch";
// import MapDirections from "./MapsDirection";
// import Search from "./AutoCompleteSearch2";

class Main extends React.Component {
  render() {
    return (
      <main>
        <SearchBar />
        {/* <MapDirections /> */}
      </main>
    );
  }
}

export default Main;
