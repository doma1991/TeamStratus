import React from "react";
import "./weather.css";
const Skycons = require("skycons")(window);

var skycons = new Skycons({ color: "blue" });

class PopularWeather extends React.Component {
  constructor(props) {
    super(props);
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
    this.ref3 = React.createRef();
    this.ref4 = React.createRef();
    this.ref5 = React.createRef();

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
      // icon1: "CLEAR_NIGHT",
      // icon2: "",
      // icon3: "",
      // icon4: "",
      // icon5: "",
      // icon: []
    };

    this.getTopFiveWeather("weather1", "40.7128", "74.0060", "temp1");
    this.getTopFiveWeather("weather2", "25.2048", "55.2708", "temp2");
    this.getTopFiveWeather("weather3", "52.5200", "13.4050", "temp3");
    this.getTopFiveWeather("weather4", "33.8688", "151.2093", "temp4");
    this.getTopFiveWeather("weather5", "48.8566", "2.3522", "temp5");
    // this.getTopFiveCurrencyRate("currency1", "US");
    // this.getTopFiveCurrencyRate("currency2", "AE");
    // this.getTopFiveCurrencyRate("currency3", "DE");
    // this.getTopFiveCurrencyRate("currency4", "AU");
    // this.getTopFiveCurrencyRate("currency5", "FR");
  }

  // async getTopFiveCurrencyRate(value, destination) {
  //   let data;
  //   try {
  //     let URL = "http://localhost:8080/getcurrencybydestination/" + destination;
  //     let response = await fetch(URL);
  //     data = await response.json().then(responseJson => {
  //       this.setState({
  //         [value]: responseJson.rate
  //       });
  //     });
  //     console.log(URL);
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  //
  //   return data;
  // }

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
    return data;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="column">
            <div className="card">
              <canvas id="icon1" ref={this.ref1} width="128" height="128" />
              <h3>{this.state.weather1}</h3>
              <p>{this.state.country1}</p>
              <p>{this.state.temp1} celsius</p>
              {/*<p>{this.state.currency1}</p>*/}
            </div>
          </div>

          <div className="column">
            <div className="card">
              <canvas id="icon2" ref={this.ref2} width="50" height="50" />
              <h3>{this.state.weather2}</h3>
              <p>{this.state.country2}</p>
              <p>{this.state.temp2} celsius</p>
              {/*<p>{this.state.currency2}</p>*/}
            </div>
          </div>

          <div className="column">
            <div className="card">
              <canvas id="icon3" ref={this.ref3} width="50" height="50" />
              <h3>{this.state.weather3}</h3>
              <p>{this.state.country3}</p>
              <p>{this.state.temp3} celsius</p>
              {/*<p>{this.state.currency3}</p>*/}
            </div>
          </div>

          <div className="column">
            <div className="card">
              <canvas id="icon4" ref={this.ref4} width="50" height="50" />
              <h3>{this.state.weather4}</h3>
              <p>{this.state.country4}</p>
              <p>{this.state.temp4} celsius</p>
              {/*<p>{this.state.currency4}</p>*/}
            </div>
          </div>

          <div className="column">
            <div className="card">
              <canvas id="icon5" ref={this.ref5} width="50" height="50" />
              <h3>{this.state.weather5}</h3>
              <p>{this.state.country5}</p>
              <p>{this.state.temp5} celsius</p>
              {/*<p>{this.state.currency5}</p>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    const skycons = new Skycons({ color: "blue" });
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

export default PopularWeather;
