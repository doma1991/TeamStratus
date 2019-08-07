import React, { Component } from "react";

class FlightsView extends React.Component {
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
              <p>{this.state.currency1}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <canvas id="icon2" ref={this.ref2} width="50" height="50" />
              <h3>{this.state.weather2}</h3>
              <p>{this.state.country2}</p>
              <p>{this.state.temp2} celsius</p>
              <p>{this.state.currency2}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <canvas id="icon3" ref={this.ref3} width="50" height="50" />
              <h3>{this.state.weather3}</h3>
              <p>{this.state.country3}</p>
              <p>{this.state.temp3} celsius</p>
              <p>{this.state.currency3}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <canvas id="icon4" ref={this.ref4} width="50" height="50" />
              <h3>{this.state.weather4}</h3>
              <p>{this.state.country4}</p>
              <p>{this.state.temp4} celsius</p>
              <p>{this.state.currency4}</p>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <canvas id="icon5" ref={this.ref5} width="50" height="50" />
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

export default FlightsView;
