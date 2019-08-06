import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import moment from "moment";
// import Weather from "./weather";
// import Splash from "../vanSplash.jpg";
import MapContainer from "./Map";

var MapS = <MapContainer />;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
      startDate: "",
      endDate: "",
      searchResultId: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  // componentDidMount() {
  //   fetch()
  //     .then(res => res.json())
  //     .then(json => this.setState({ data: json }));
  // }

  async handleSubmit(event) {
    try {
      event.preventDefault();
      let baseURL = "http://localhost:8080/getmaps/";
      let URL = baseURL + this.state.from + "/" + this.state.to + "/now/d/";
      let response = await fetch(URL);
      let data = await response.json();
      this.handleResponse(data);
    } catch (e) {
      console.log("error", e);
    }
  }

  handleChange = valueName => {
    return event => {
      this.setState({ [valueName]: event.target.value });
    };
  };

  handleChangeDate = (field, date) => {
    this.setState({ [field]: date });
  };

  handleResponse = data => {
    localStorage.setItem("mapRequest", JSON.stringify(data));
    MapS = <MapContainer />;
    // let storage = data.endLatitude;
    // this.setState({ searchResultId: storage });
    console.log(JSON.stringify(data));
  };

  triggerChildAlert() {
    this.ref.weather.printId();
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
              <input
                type="text"
                placeholder="From"
                name="from"
                value={this.state.from}
                onChange={this.handleChange("from")}
              />
            </div>
            <div className="location-search d-flex p-3">
              <label>To: </label>
              <input
                type="text"
                placeholder="To"
                name="to"
                value={this.state.to}
                onChange={this.handleChange("to")}
              />
            </div>
            <div className="container date-fields p-3">
              <div className="row">
                <div className="w-100 p-2">
                  <label>Select Start Date: </label>
                  <DatePicker
                    placeholder="Select start date"
                    todayButton={"Today"}
                    name="startDate"
                    selected={this.state.startDate}
                    onChange={this.handleChangeDate.bind(this, "startDate")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </div>

                <div className="w-100 p-2">
                  <label>Select End Date: </label>
                  <DatePicker
                    placeholder="Select end date"
                    todayButton={"Today"}
                    selected={this.state.endDate}
                    onChange={this.handleChangeDate.bind(this, "endDate")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </div>
              </div>
            </div>

            <div className="container transport-fields p-3">
              <div className="row">
                <div className="col-sm-3">
                  <label>
                    <i class="fas fa-car fa-2x" />
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <i class="fas fa-bus fa-2x" />
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <i class="fas fa-walking fa-2x" />
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <i class="fas fa-biking fa-2x" />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <button
                className="btn btn-success"
                onClick={this.triggerChildAlert}
              >
                Go!
              </button>
            </div>
          </form>
        </div>
        <div>{MapS}</div>
      </div>
    );
  }
}
export default SearchBar;
