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
      Date: "",
      transportMode: ""
    }
    // transportModeOptions:['driving','bicycling','transit'];

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm=this.handleClearForm.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    try{

         let response=await fetch("http://localhost:8080/getmaps/");
        let data=await response.json();
        this.handleResponse(data);}
        catch(e){
        }
           fetch('http://example.com',{
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
              }).then(response => {
                response.json().then(data =>{
                  console.log("Successful" + data);
                })
            })


  }

  handleClearForm(e){
    e.preventDefault();
          this.setState({
            from: "",
                  to: "",
                  Date: "",
                  transportMode: ""
          })
  }

  handleChange(event){
  let value = e.target.value;
  let name= e.target.name;
    this.setState( {name:value});
  }

  handleDateChange(date){
  this.setState({ startDate:date});
  }

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
            onChange={this.handleChange}
          />

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
              <label> Select transport mode </label>
              <select value="{this.state.transportMode}" name="transportMode" onChange="{this.handleChange}">
              <option value="driving"> driving </option>
              <option value="bicycling"> cycling </option>
              <option value="transit"> public transports </option>

              </select>
                       <div className="container">
                          <div className="form-group">
                            <label>Select Start Date: </label>
                            <DatePicker
                              placeholder="Select start date"
                              todayButton={"Today"}
                              name="Date"
                              selected={this.state.Date}
                              onChange={this.handleDateChange}
                              showTimeSelect
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              dateFormat="MMMM d, yyyy h:mm aa"
                              timeCaption="time"
                            />
                          </div>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
