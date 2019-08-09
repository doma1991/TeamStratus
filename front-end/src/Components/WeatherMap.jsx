import React from "react";
import "./weather.css";
const Skycons = require("skycons")(window);

var skycons = new Skycons({ color: "blue" });
var origina;
var originn;
var destinationa;
var destinationn;
var origin;
var destination;
var routed;

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
    } catch (e) {}

    return data;
  }

  updateValues(value, data) {
    this.setState({
      [value]: data.currently.icon
    });
  }

  render() {
    return (
      <div>
        <div className="row destination-card-row mx-auto">
          <div className="col-6">
            <div className="card" id="travelCard1">
              <canvas id="travelIcon1" ref={this.ref1} width="42" height="42" />
              <p>{origin}</p>
              <p>{this.state.temp1} fahrenheit</p>
            </div>
          </div>

          <div className="col-6">
            <div className="card" id="travelCard2">
              <canvas id="travelIcon2" ref={this.ref2} width="42" height="42" />
              <p>{destination}</p>
              <p>{this.state.temp2} fahrenheit</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentWillReceiveProps() {
    routed = JSON.parse(localStorage.getItem("mapRequest"));

    try {
      origin = routed.startLocation;
      destination = routed.endLocation;
      origina = routed.startLatitude;

      originn = routed.startLongitude;
      origin = origin.replace("+", ", ");
      destination = destination.replace("+", ", ");
      destinationa = routed.endLatitude;
      destinationn = routed.endLongitude;
    } catch (e) {}
    const skycons = new Skycons({ color: "#648f97" });

    this.getTopFiveWeather("weather1", origina, originn, "temp1");
    this.getTopFiveWeather("weather2", destinationa, destinationn, "temp2");

    let weather1 = this.state.weather1;
    skycons.add(document.getElementById("travelIcon1"), weather1);
    let weather2 = this.state.weather2;
    skycons.add(document.getElementById("travelIcon2"), weather2);

    skycons.play();
  }
}

export default WeatherMap;
