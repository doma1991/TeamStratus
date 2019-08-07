import MapsDirection from "./MapsDirection";
import MapContainer from "./Map";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import moment from "moment";
// import Weather from "./weather";

import ToggleButton from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";

// Also need to install moment byt running: npm install moment
//

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
      travelDate: "",
      endDate: "",
      transportMode: "d",
      map: <MapsDirection />,
      result: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
  }
  handleClearForm(e) {
    this.setState({
      from: "",
      to: "",
      travelDate: "",
      transportMode: "",
      address: ""
    });
  }

  handleChange = valueName => {
    return event => {
      this.setState({ [valueName]: event.target.value });
      console.log(this.state[valueName]);
    };
  };


handleChangeMode(event) {
  this.setState({
    transportMode: event.target.value
  });
}


  handleChangeDate(date) {

    this.setState({ travelDate: date });
    console.log(this.state.travelDate);
  };

  async handleSubmit(event) {
    try {
      event.preventDefault();
      let baseURL = "http://localhost:8080/getmaps/";
      let URL =
        baseURL + this.state.from + "/" + this.state.to + "/now/" + this.state.transportMode + "/";
      let response = await fetch(URL);
      let data = await response.json();
      this.handleResponse(data);
    } catch (e) {
      console.log("error", e);
    }
    this.handleClearForm();
  }

  handleResponse = data => {
    localStorage.setItem("mapRequest", JSON.stringify(data));
    this.setState({ map: <MapsDirection /> });

    console.log(JSON.stringify(data));
  };

  triggerChildAlert = () => {
    this.setState({ result: true });
  };

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
                    placeholder="Select travel date"
                    todayButton={"Today"}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd h:mm"
                    timeCaption="time"
                    selected={this.state.travelDate}
                    onChange={this.handleChangeDate}

                    // should return "yyyy-MM-dd 'at' HH:mm" to pass to api
                  />
                </div>
              </div>
            </div>

            <div className="container transport-fields p-3">

              <div className="row">

                <div className="col-sm-3">

                   <input
                                 type="radio"
                                 value="d"
                                 checked={this.state.transportMode === "d"}
                                 onChange={this.handleChangeMode}
                               />
                      <i class="fas fa-car fa-2x" />


                </div>

                <div className="col-sm-3">

                   <input
                                 type="radio"
                                 value="t"
                                 checked={this.state.transportMode === "t"}
                                 onChange={this.handleChangeMode}
                               />
                      <i class="fas fa-bus fa-2x" />


                </div>

                <div className="col-sm-3">

                                      <input
                                                    type="radio"
                                                    value="w"
                                                    checked={this.state.transportMode === "w"}
                                                    onChange={this.handleChangeMode}
                                                  />
                      <i class="fas fa-walking fa-2x" />


                </div>

                <div className="col-sm-3">

                               <input
                                             type="radio"
                                             value="b"
                                             checked={this.state.transportMode === "b"}
                                             onChange={this.handleChangeMode}
                                           />
                      <i class="fas fa-biking fa-2x" />


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
        <div className="mapBox">{this.state.result ? this.state.map : ""}</div>
      </div>
    );
  }
}
export default SearchBar;
