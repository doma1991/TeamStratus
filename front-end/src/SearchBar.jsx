import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

// Also need to install moment byt running: npm install moment
//

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
      startDate: "",
      endDate: "",
      transportMode: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }
  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      from: "",
      to: "",
      Date: "",
      transportMode: ""
    });
  }
  handleChange = valueName => {
    return event => {
      this.setState({ [valueName]: event.target.value });
    };
  };

  transHandleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ transportMode: value });
  }

  handleChangeDate = (field, date) => {
    this.setState({ [field]: date });
  };

  async handleSubmit(event) {
    this.handleClearForm();
    try {
      event.preventDefault();
      let baseURL = "http://localhost:8080/getmaps/";
      let URL = baseURL + this.state.from + "/" + this.state.to + "/now/d/";
      let response = await fetch(URL);
      // let response = await fetch(
      //   "http://localhost:8080/getmaps/London/Cambridge/2019-09-01%20at%2011:00/d/"
      // );
      let data = await response.json();
      this.handleResponse(data);
    } catch (e) {
      console.log("error", e);
    }
  }

  handleResponse = data => {
    localStorage.setItem("mapRequest", data);
    // let storage = data.endLatitude;
    // this.setState({ searchResultId: storage });
    console.log(data);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>From: </label>
          <input
            type="text"
            placeholder="From"
            name="from"
            value={this.state.from}
            onChange={this.handleChange("from")}
          />
          <div className="container">
            <div className="form-group">
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
          </div>
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
          <div className="container">
            <div className="form-group">
              <label> Select transport mode </label>
              <select
                value={this.state.transportMode}
                name="transportMode"
                onChange={this.handleChange("transportMode")}
              >
                <option value="driving"> driving </option>
                <option value="bicycling"> cycling </option>
                <option value="transit"> public transports </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-success">Go!</button>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
