import React from "react";
import "./weather.css";
// const Skycons= require("skycons")(window);

// var skycons = new Skycons({"color" : "blue"});

class PopularWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather1: "",
      weather2: "",
      weather3: "",
      weather4: "",
      weather5: "",
      country1: "New York",
      country2: "Dubai",
      country3: "Berlin",
      country4: "Sydney",
      country5: "Paris",
      temp1: "",
      temp2: "",
      temp3: "",
      temp4: "",
      temp5: "",
      currency1: "",
      currency2: "",
      currency3: "",
      currency4: "",
      currency5: ""
    };

    this.getTopFiveWeather("weather1", "40.7128", "74.0060", "temp1");
    this.getTopFiveWeather("weather2", "25.2048", "55.2708", "temp2");
    this.getTopFiveWeather("weather3", "52.5200", "13.4050", "temp3");
    this.getTopFiveWeather("weather4", "33.8688", "151.2093", "temp4");
    this.getTopFiveWeather("weather5", "48.8566", "2.3522", "temp5");
    this.getTopFiveCurrencyRate("currency1", "US");
    this.getTopFiveCurrencyRate("currency2", "AE");
    this.getTopFiveCurrencyRate("currency3", "DE");
    this.getTopFiveCurrencyRate("currency4", "AU");
    this.getTopFiveCurrencyRate("currency5", "FR");
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
        // skycons.add("icon1", skycons.PARTYLY_CLOUDY_DAY);
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
    return (
      <div>
        <div className="row">
          <div className="column">
            <div className="card">
              <canvas id="icon1" width="128" height="128" />
              <h3>{this.state.weather1}</h3>
              <p>{this.state.country1}</p>
              <p>{this.state.temp1} celsius</p>
              <p>{this.state.currency1}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>{this.state.weather2}</h3>
              <p>{this.state.country2}</p>
              <p>{this.state.temp2} celsius</p>
              <p>{this.state.currency2}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>{this.state.weather3}</h3>
              <p>{this.state.country3}</p>
              <p>{this.state.temp3} celsius</p>
              <p>{this.state.currency3}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>{this.state.weather4}</h3>
              <p>{this.state.country4}</p>
              <p>{this.state.temp4} celsius</p>
              <p>{this.state.currency4}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <h3>{this.state.weather5}</h3>
              <p>{this.state.country5}</p>
              <p>{this.state.temp5} celsius</p>
              <p>{this.state.currency5}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularWeather;
