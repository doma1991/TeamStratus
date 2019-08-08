import React from "react";
import "./weather.css";
const Skycons = require("skycons")(window);

var skycons = new Skycons({ color: "blue" });
var routed;
var origina;
var originn;
var destinationa;
var destinationn;
var origin;
var destination;

class WeatherMap extends React.Component {
  constructor(props) {
    super(props);
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();

    this.state = {
      weather1: "",
      weather2: "",

      country1: origin,
      country2: destination,

      temp1: "",
      temp2: "",

      currency1: "",
      currency2: ""
    };
  }

  async getTopFiveCurrencyRate(value, destination) {
    let data;
    try {
      let URL = "http://localhost:8080/getcurrencybydestination/" + destination;
      let response = await fetch(URL);
      data = await response.json().then(responseJson => {
        this.setState({
          [value]: responseJson.rate
        });
      });
      console.log(URL);
    } catch (e) {
      console.log("error", e);
    }

    return data;
  }

  async getTopFiveWeather(value, latitude, longitude, value2) {
    let data;
    // var skycons = new Skycons ({"color" : "blue"});
    try {
      let URL =
        "http://localhost:8080/getweatherbydestination/" +
        latitude +
        "/" +
        longitude;
      let response = await fetch(URL);
      data = await response.json().then(responseJson => {
        this.setState({
          [value]: responseJson.currently.icon
        });
        this.setState({
          [value2]: responseJson.currently.temperature
        });

        skycons.add("travelIcon1", skycons.responseJson.currently.icon);
        skycons.add("travelIcon2", skycons.responseJson.currently.icon);

        console.log(skycons.responseJson.currently.icon);

        if (!skycons.responseJson.currently.icon) {
          return <h2>Loading...</h2>;
        }

        if (
          skycons.responseJson.currently.icon("clear-night") === "clear-night"
        ) {
          this.setState({ [value]: Skycons.CLEAR_NIGHT });
        } else if (
          skycons.responseJson.currently.icon("clear-day") === "clear-day"
        ) {
          this.setState({ [value]: Skycons.CLEAR_DAY });
        } else if (
          skycons.responseJson.currently.icon("partly-cloudy-day") ===
          "partly-cloudy-day"
        ) {
          this.setState({ [value]: Skycons.PARTLY_CLOUDY_DAY });
        } else if (skycons.responseJson.currently.icon("rain") === "RAIN") {
          this.setState({ [value]: Skycons.RAIN });
        } else if (skycons.responseJson.currently.icon("cloudy") === "CLOUDY") {
          this.setState({ [value]: Skycons.CLOUDY });
        } else {
          console.log("error!");
        }
        this.setState({
          [value2]: responseJson.currently.temperature
        });
      });
    } catch (e) {
      console.log("error", e);
    }
    console.log(data);

    return data;
  }

  updateValues(value, data) {
    this.setState({
      [value]: data.currently.icon
    });
  }

  render() {
    try {
      routed = JSON.parse(localStorage.getItem("mapRequest"));
      origin = routed.startLocation;
      destination = routed.endLocation;
      origina = routed.startLatitude;

      originn = routed.startLongitude;
      origin = origin.replace("+", ", ");
      destination = destination.replace("+", ", ");
      destinationa = routed.endLatitude;
      destinationn = routed.endLongitude;
    } catch (e) {}

    this.getTopFiveWeather("weather1", origina, originn, "temp1");
    this.getTopFiveWeather("weather2", destinationa, destinationn, "temp2");

    return (
      <div>
        <div className="row destination-row mx-auto">
          <div className="column">
            <div className="card" id="card1">
              <canvas id="travelIcon1" ref={this.ref1} width="42" height="42" />
              <p>{this.state.country1}</p>
              <p>{this.state.temp1} celsius</p>
            </div>
          </div>

          <div className="column">
            <div className="card" id="card2">
              <canvas id="travelIcon2" ref={this.ref2} width="42" height="42" />
              <p>{this.state.country2}</p>
              <p>{this.state.temp2} celsius</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    const skycons = new Skycons({ color: "white" });

    let weather1 = this.state.weather1;
    skycons.add(document.getElementById("travelIcon1"), weather1);
    let weather2 = this.state.weather2;
    skycons.add(document.getElementById("travelIcon2"), weather2);
    let weather3 = this.state.weather3;

    skycons.play();
  }
}

export default WeatherMap;
