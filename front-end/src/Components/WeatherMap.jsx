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

try{
routed= JSON.parse(localStorage.getItem("mapRequest"));
origin=routed.startLocation;
destination=routed.endLocation;
origina= routed.startLatitude;

originn= routed.startLongitude;
origin=origin.replace("+",", ");
destination=destination.replace("+",", ");
destinationa= routed.endLatitude;
destinationn= routed.endLongitude;

}
catch(e){
}

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
      currency2: "",

      // icon1: "CLEAR_NIGHT",
      // icon2: "",
      // icon3: "",
      // icon4: "",
      // icon5: "",
      // icon: []
    };

    this.getTopFiveWeather("weather1", origina, originn, "temp1");
    this.getTopFiveWeather("weather2", destinationa, destinationn, "temp2");

    this.getTopFiveCurrencyRate("currency1", "US");
    this.getTopFiveCurrencyRate("currency2", "AE");

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

        skycons.add("icon1", skycons.responseJson.currently.icon);
        // skycons.add("icon2", skycons.responseJson.currently.icon);
        // skycons.add("icon3", skycons.responseJson.currently.icon);
        // skycons.add("icon4", skycons.responseJson.currently.icon);
        // skycons.add("icon5", skycons.responseJson.currently.icon);

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

          // skycons.add(document.getElementById("icon1"), Skycons.PARTLY_CLOUDY_DAY);
          // skycons.add(document.getElementById("icon2"), Skycons.CLEAR_NIGHT);
          // skycons.add(document.getElementById("icon3"), Skycons.CLEAR_DAY);
          // skycons.add(document.getElementById("icon4"), Skycons.RAIN);
          // skycons.add(document.getElementById("icon5"), Skycons.CLOUDY);
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
    return (
      <div>
        <div className="row destination-row mx-auto">
          <div className="column">
            <div className="card" id="card1">
              <canvas id="icon1" ref={this.ref1} width="42" height="42" />
              <p>{this.state.country1}</p>
              <p>{this.state.temp1} celsius</p>
              <p>{this.state.currency1}</p>
            </div>
          </div>

          <div className="column">
            <div className="card" id="card2">
              <canvas id="icon2" ref={this.ref2} width="42" height="42" />
              <p>{this.state.country2}</p>
              <p>{this.state.temp2} celsius</p>
              <p>{this.state.currency2}</p>
            </div>
          </div>


        </div>
      </div>
    );
  }
  componentDidUpdate() {
    const skycons = new Skycons({ color: "white" });
    // skycons.add(this.ref1.current, Skycons.PARTLY_CLOUDY_DAY);
    // skycons.add(this.ref2.current, Skycons.CLEAR_NIGHT);
    // skycons.add(this.ref3.current, Skycons.CLOUDY);
    // skycons.add(this.ref4.current, Skycons.CLEAR_DAY);
    // skycons.add(this.ref5.current, Skycons.RAIN);
    let weather1 = this.state.weather1;
    skycons.add(document.getElementById("icon1"), weather1);
    let weather2 = this.state.weather2;
    skycons.add(document.getElementById("icon2"), weather2);
    let weather3 = this.state.weather3;
    skycons.add(document.getElementById("icon3"), weather3);
    let weather4 = this.state.weather4;
    skycons.add(document.getElementById("icon4"), weather4);
    let weather5 = this.state.weather5;
    skycons.add(document.getElementById("icon5"), weather5);
    //    skycons.add(document.getElementById("icon2"), Skycons.CLEAR_NIGHT);
    //    skycons.add(document.getElementById("icon3"),
    //    skycons.add(document.getElementById("icon4"), Skycons.RAIN);
    //    skycons.add(document.getElementById("icon5"), Skycons.CLOUDY);
    skycons.play();

    // if (!skycons.responseJson.currently.icon) {
    //     return (<h2>Loading...</h2>);
    // }

    // if(skycons.responseJson.currently.icon === 'wind') {
    //     skycons.set("wind", Skycons.WIND);
    //     skycons.play();
    // } else if(skycons.responseJson.currently.icon === 'clear-day') {
    //     skycons.set("clear-day", Skycons.CLEAR_DAY);
    //     skycons.play();
    // } else if(skycons.responseJson.currently.icon === 'partly-cloudy-day') {
    //     skycons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
    //     skycons.play();
    // } else if(skycons.responseJson.currently.icon === 'partly-cloudy-night') {
    //     skycons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
    //     skycons.play();
    // } else {
    //     console.log('error!');
    // }
  }
}

export default WeatherMap;
