import React from "react";
import './weather.css';


class PopularWeather extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            weather1: "",
            weather2: "",
            weather3: "",
            weather4: "",
            weather5: "",
            country1:"London",
            country2:"Dubai",
            country3:"Berlin",
            country4:"Sydney",
            country5:"Paris",
            temp1: "",
            temp2: "",
            temp3: "",
            temp4: "",
            temp5: ""
        };

        this.getTopFiveWeather("weather1","LHR","temp1");
         this.getTopFiveWeather("weather2","DXB","temp2");
        this.getTopFiveWeather("weather3","BER","temp3");
        this.getTopFiveWeather("weather4","SYD","temp4");
        this.getTopFiveWeather("weather5","CDG","temp5");
    }


    async getTopFiveWeather( value ,destination, value2){
        let data;
        try {
            let URL = "http://localhost:8080/getweatherbydestination/" + destination ;
            let response = await fetch(URL);
            data = await response.json();
            console.log(data.currently.icon);
        } catch (e) {
            console.log("error", e);
        }
        console.log(data);
        this.setState({
            [value]: data.currently.icon });
        this.setState({
             [value2]: data.currently.temperature});

        return data;
    }

    updateValues(value, data){
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
                            <h3>{this.state.weather1}</h3>
                            <p>{this.state.country1}</p>
                            <p>{this.state.temp1} celsius</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>{this.state.weather2}</h3>
                            <p>{this.state.country2}</p>
                            <p>{this.state.temp2} celsius</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>{this.state.weather3}</h3>
                            <p>{this.state.country3}</p>
                            <p>{this.state.temp3} celsius</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <h3>{this.state.weather4}</h3>
                            <p>{this.state.country4}</p>
                            <p>{this.state.temp4} celsius</p>
                        </div>
                    </div>


                    <div className="column">
                        <div className="card">
                            <h3>{this.state.weather5}</h3>
                            <p>{this.state.country5}</p>
                            <p>{this.state.temp5} celsius</p>
                        </div>
                    </div>


                </div>


            </div>
        );
    }
}

export default PopularWeather;