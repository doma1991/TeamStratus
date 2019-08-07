import MapsDirection from "./MapsDirection";
import MapContainer from "./Map";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Weather from "./weather";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

// Also need to install moment byt running: npm install moment
//

var MapS = <MapContainer />;
var MapD = <MapsDirection />;
class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromAddress: "",
      fromCity: "",
      fromCountry: "",
      toAddress: "",
      toCity: "",
      toCountry: "",
      travelDate: "",
      transportMode: ""
    };

    this.fromHandleChange = this.fromHandleChange.bind(this);
    this.fromHandleSelect = this.fromHandleSelect.bind(this);
    this.fromSeparateAddress = this.fromSeparateAddress.bind(this);
    this.toHandleChange = this.toHandleChange.bind(this);
    this.toHandleSelect = this.toHandleSelect.bind(this);
    this.toSeparateAddress = this.toSeparateAddress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  // handleClearForm(e) {
  //   this.setState({
  //     from: "",
  //     to: "",
  //     travelDate: "",
  //     transportMode: "",
  //     address: ""
  //   });
  // }

  fromHandleChange = fromAddress => {
    this.setState({ fromAddress });
  };

  fromHandleSelect = fromAddress => {
    this.setState({ fromAddress });
    this.toSeparateAddress(fromAddress);
    geocodeByAddress(fromAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  fromSeparateAddress = fromAddress => {
    let currAddress = fromAddress;
    let result = [];
    result = currAddress.split(",");
    let i = result.length;
    let j = i - 1;
    let fromCity = result[0].trim();
    let fromCountry = result[j].trim();
    this.setState({ fromCity: fromCity });
    this.setState({ fromCountry: fromCountry });
    //strip white splace then concat. the city and country//
  };

  toHandleChange = toAddress => {
    this.setState({ toAddress });
  };

  toHandleSelect = toAddress => {
    this.setState({ toAddress });
    this.toSeparateAddress(toAddress);
    geocodeByAddress(toAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  toSeparateAddress = toAddress => {
    let currAddress = toAddress;
    let result = [];
    result = currAddress.split(",");
    let i = result.length;
    let j = i - 1;
    let toCity = result[0].trim();
    let toCountry = result[j].trim();
    this.setState({ toCity: toCity });
    this.setState({ toCountry: toCountry });
    console.log(this.state.fromCity);
    //strip white splace then concat. the city and country//
  };

  handleChange = valueName => {
    return event => {
      this.setState({ [valueName]: event.target.value });
      console.log(this.state.transportMode);
    };
  };

  // transHandleChange(e) {
  //   let value = e.target.value;
  //   let name = e.target.name;
  //   this.setState({ transportMode: value });
  // }

  handleChangeDate = (field, date) => {
    this.setState({ [field]: date });
    console.log(this.state.travelDate);
  };

  async handleSubmit(event) {
    try {
      event.preventDefault();
      let baseURL = "http://localhost:8080/getmaps/";
      console.log(this.state.fromCity);
      let URL =
        baseURL +
        this.state.fromCity +
        "+" +
        this.state.fromCountry +
        "/" +
        this.state.toCity +
        "+" +
        this.state.toCountry +
        "/now/d/";
      console.log(URL);
      let response = await fetch(URL);
      let data = await response.json();
      this.handleResponse(data);
    } catch (e) {
      console.log("error", e);
    }
    // this.handleClearForm();
  }

  handleResponse = data => {
    localStorage.setItem("mapRequest", JSON.stringify(data));
    MapS = <MapContainer />;
    // let storage = data.endLatitude;
    // this.setState({ searchResultId: storage });
    console.log(JSON.stringify(data));
  };

  triggerChildAlert() {
    // this.ref.weather.printId();
  }

  render() {
    return (
      <div className="search-splash">
        <div className="welcome ">
          <h1 className="page-header-one splash-title">GetYourWay</h1>
        </div>
        <div className="searchPanel">
          <div className="panelHeader">
            <div id="header">
              <a href="https://www.sky.com" className="login-logo" />
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="location-search d-flex p-3">
              <label>From: </label>
              <PlacesAutocomplete
                value={this.state.fromAddress}
                onChange={this.fromHandleChange}
                onSelect={this.fromHandleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input"
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            <div className="location-search d-flex p-3">
              <label>To: </label>
              <PlacesAutocomplete
                value={this.state.toAddress}
                onChange={this.toHandleChange}
                onSelect={this.toHandleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input"
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            <div className="container date-fields p-3">
              <div className="row">
                <div className="w-100 p-2">
                  <label>Select Start Date: </label>
                  <DatePicker
                    placeholder="Select travel date"
                    todayButton={"Today"}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                    timeCaption="time"
                    selected={this.state.travelDate}
                    onChange={this.handleChangeDate.bind(this, "travelDate")}

                    // should return "yyyy-MM-dd 'at' HH:mm" to pass to api
                  />
                </div>
              </div>
            </div>

            <div className="container transport-fields p-3">
              <div className="row">
                <div className="col-sm-3">
                  <label>
                    <Button
                      value="d"
                      onClick={this.handleChange("transportMode")}
                    >
                      <i className="fas fa-car fa-2x" />
                    </Button>
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <Button
                      value="t"
                      onClick={this.handleChange("transportMode")}
                    >
                      <i className="fas fa-bus fa-2x" />
                    </Button>
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <Button
                      value="w"
                      onClick={this.handleChange("transportMode")}
                    >
                      <i className="fas fa-walking fa-2x" />
                    </Button>
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <Button
                      value="b"
                      onClick={this.handleChange("transportMode")}
                    >
                      <i className="fas fa-biking fa-2x" />
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <button
                className="btn btn-success"
                onClick={this.triggerChinldAlert}
              >
                Go!
              </button>
            </div>
          </form>
        </div>
        <div className="mapBox">{MapD}</div>
      </div>
    );
  }
}
export default SearchBar;
