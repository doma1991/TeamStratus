import MapsDirection from "./MapsDirection";
import MapContainer from "./Map";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import moment from "moment";
// import Weather from "./weather";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";

// Also need to install moment byt running: npm install moment
//

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
      Date: "",
      endDate: "",
      transportMode: "",
      map: <MapsDirection />,
      result: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
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
      let URL =
        baseURL + this.state.from + "/" + this.state.to + "/now/" + "d" + "/";
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
                      <i class="fas fa-car fa-2x" />
                    </Button>
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <Button
                      value="t"
                      onClick={this.handleChange("transportMode")}
                    >
                      <i class="fas fa-bus fa-2x" />
                    </Button>
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <Button
                      value="w"
                      onClick={this.handleChange("transportMode")}
                    >
                      <i class="fas fa-walking fa-2x" />
                    </Button>
                  </label>
                </div>

                <div className="col-sm-3">
                  <label>
                    <Button
                      value="b"
                      onClick={this.handleChange("transportMode")}
                    >
                      <i class="fas fa-biking fa-2x" />
                    </Button>
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
        <div className="mapBox">{this.state.result ? this.state.map : ""}</div>
      </div>
    );
  }
}
export default SearchBar;
