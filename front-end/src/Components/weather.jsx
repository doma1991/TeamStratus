import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temps: "",
      icon: "",
      summary: "",
      routeId: this.props.getRouteId
      // routeId: ""
    };
    //   this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }
  async handleChange(event) {
    var routeId = this.props.getRouteId;

    try {
      event.preventDefault();
      let response = await fetch(
        "http://localhost:8080/getWeatherNow/" + this.routeId
      );
      let data = await response.json();
      this.handleResponse(data);
    } catch (e) {
      console.log("error", e);
    }
  }
  handleResponse = data => {
    let storage = data.temps;
    this.setState({ data: storage });
  };

  printId() {
    console.log(this.props.getRouteId);
  }
  render() {
    return (
      <div>
        <label>Weather: </label>
        <h1>{this.state.data}</h1>
      </div>
    );
  }
}

export default Weather;
