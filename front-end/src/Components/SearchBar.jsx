import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Weather from "./weather";
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
      transportMode: ""
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
        baseURL +
        this.state.from +
        "/" +
        this.state.to +
        "/now/" +
        this.state.transportMode +
        "/";
      let response = await fetch(URL);
      let data = await response.json();
      this.handleResponse(data);
    } catch (e) {
      console.log("error", e);
    }
    this.handleClearForm();
  }

  handleResponse = data => {
    localStorage.setItem("mapRequest", data);
    console.log(data);
  };

  // triggerChildAlert() {
  //   this.ref.weather.printId();
  // }

  render() {
    return (
      <div>
        <h1>{this.state.data}</h1>
        {/* <Weather
          ref="weather"
          getRouteId={this.state.searchResultId}
          handleChange={this.handleChange}
        /> */}

        <form onSubmit={this.handleSubmit}>
          <label>From: </label>
          <input
            type="text"
            placeholder="From"
            name="from"
            value={this.state.from}
            onChange={this.handleChange("from")}
          />

          <label>To: </label>
          <input
            type="text"
            placeholder="To"
            name="to"
            value={this.state.to}
            onChange={this.handleChange("to")}
          />
          <div className="container">
            <div className="form-group">
              <label>Select End Date: </label>
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
          <div className="container">
            <div className="form-group">
              <label> Select transport mode </label>
              <select
                value={this.state.transportMode}
                name="transportMode"
                onChange={this.handleChange("transportMode")}
              >
                <option value="w">walking</option>
                <option value="d"> driving </option>
                <option value="b"> cycling </option>
                <option value="t"> public transports </option>
              </select>
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
    );
  }
}
export default SearchBar;
