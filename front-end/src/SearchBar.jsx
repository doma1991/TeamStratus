import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
      data: []
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
      fetch(
        "http://localhost:8080/getmaps/Liverpool/Manchester/2019-09-01%20at%2011:00/d/"
      )
        .then(res => res.text()) // convert to plain text
        .then(text => console.log(text));
      // .then(function(response) {
      //   return response.json();
      // })
      // .then(function(myJson) {
      //   console.log(JSON.stringify(myJson));
      // });
    } catch (e) {
      console.log("error", e);
    }
  }
  // async handleSubmit(event) {
  //   try {
  //     event.preventDefault();
  //     let response = await fetch(
  //       "http://localhost:8080/getmaps/London/Manchester/2019-09-01%20at%2011:00/t/",
  //       {
  //         method: "GET"
  //         // headers: {
  //         //   Accept: "application/json",
  //         //   "Content-Type": "application/json"
  //         // }
  //       }
  //     );
  //     // console.log(json);
  //     let data = await response;
  //     this.handleResponse(data);
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  // }

  handleChange = valueName => {
    return event => {
      this.setState({ [valueName]: event.target.value });
    };
  };

  handleChangeDate = (field, date) => {
    this.setState({ [field]: date });
  };

  handleResponse = data => {
    let storage = JSON.parse(JSON.stringify(data));
    console.log(storage);
  };

  render() {
    return (
      <div>
        <h1>{this.state.data}</h1>
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
                todayButton={"Vandaag"}
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
          <div className="form-group">
            <button className="btn btn-success">Go!</button>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
