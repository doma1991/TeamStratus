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
            country1:"New York",
            country2:"Dubai",
            country3:"Berlin",
            country4:"Sydney",
            country5:"Paris",
            temp1: "",
            temp2: "",
            temp3: "",
            temp4: "",
            temp5: "",
            currency1: "",
            currency2: "",
            currency3: "",
            currency4: "",
            currency5: "",
        };

        this.getTopFiveWeather("weather1","JFK","temp1");
         this.getTopFiveWeather("weather2","DXB","temp2");
        this.getTopFiveWeather("weather3","BER","temp3");
        this.getTopFiveWeather("weather4","SYD","temp4");
        this.getTopFiveWeather("weather5","CDG","temp5");
        this.getTopFiveCurrencyRate("currency1","JFK");
        this.getTopFiveCurrencyRate("currency2","DXB");
        this.getTopFiveCurrencyRate("currency3","BER");
        this.getTopFiveCurrencyRate("currency4","SYD");
        this.getTopFiveCurrencyRate("currency5","CDG");
    }


    async getTopFiveCurrencyRate(value, destination){
        let data;
        try {
            let URL = "http://localhost:8080/getcurrencybydestination/" + destination ;
            let response = await fetch(URL);
            data = await response.json();
            console.log(URL);
            this.setState({
                [value]: data.rate });
        } catch (e) {
            console.log("error", e);
        }



        return data;
    }


    async getTopFiveWeather( value ,destination, value2){
        let data;
        try {
            let URL = "http://localhost:8080/getweatherbydestination/" + destination ;
            let response = await fetch(URL);
            data = await response.json();
            console.log(data.currently.icon);
            this.setState({
                [value]: data.currently.icon });
            this.setState({
                [value2]: data.currently.temperature});
        } catch (e) {
            console.log("error", e);
        }
        console.log(data);


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