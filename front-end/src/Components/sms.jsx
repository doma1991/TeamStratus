
import React, { Component } from "react";

// import moment from "moment";
// import Weather from "./weather";
// import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/Button";
// import ToggleButtonGroup from "react-bootstrap/Button";
import { Link } from "@reach/router";
import "react-datepicker/dist/react-datepicker.css";
import { Map, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

// Also need to install moment byt running: npm install moment
//



export class sms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: "",
        };
        this.handleClearForm = this.handleClearForm.bind(this);
        this.fromHandleChange = this.fromHandleChange.bind(this);
        this.fromHandleSelect = this.fromHandleSelect.bind(this);
        this.fromSeparateAddress = this.fromSeparateAddress.bind(this);
        this.toHandleChange = this.toHandleChange.bind(this);
        this.toHandleSelect = this.toHandleSelect.bind(this);
        this.toSeparateAddress = this.toSeparateAddress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClearForm(e) {
        this.setState({
            number:""
        });
    }

    fromHandleChange = fromAddress => {
        this.setState({ fromAddress });
    };

    fromHandleSelect = fromAddress => {
        this.setState({ fromAddress });
        this.fromSeparateAddress(fromAddress);
        geocodeByAddress(fromAddress)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log("Success", latLng))
            .catch(error => console.error("Error", error));
    };

    fromSeparateAddress = fromAddress => {
        let currAddress = fromAddress;
        let result = [];
        result = currAddress.split(",");
        let i = result.length;
        let j = i - 1;
        let fromCity = result[0].trim();
        let fromCountry = result[j].trim();
        this.setState({ fromCity: fromCity });
        this.setState({ fromCountry: fromCountry });
        //strip white splace then concat. the city and country//
    };

    toHandleChange = toAddress => {
        this.setState({ toAddress });
    };

    toHandleSelect = toAddress => {
        this.setState({ toAddress });
        this.toSeparateAddress(toAddress);
        geocodeByAddress(toAddress)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log("Success", latLng))
            .catch(error => console.error("Error", error));
    };

    toSeparateAddress = toAddress => {
        let currAddress = toAddress;
        let result = [];
        result = currAddress.split(",");
        let i = result.length;
        let j = i - 1;
        let toCity = result[0].trim();
        let toCountry = result[j].trim();
        this.setState({ toCity: toCity });
        this.setState({ toCountry: toCountry });
        console.log(this.state.fromCity);
        //strip white splace then concat. the city and country//
    };

    handleChange = valueName => {
        return event => {
            this.setState({ [valueName]: event.target.value });
            console.log(this.state[valueName]);
        };
    };

    handleChangeNumber(event) {
        this.setState({
    number: event.target.value
        });
    }

    handleChangeDate(date) {
        this.setState({ travelDate: date });
        console.log(this.state.travelDate);
    }

    async handleSubmit(event) {
        try {
            event.preventDefault();
            let baseURL = "http://localhost:8080/sendsms/";
            let URL =
                baseURL +
                this.state.number +
                "/";

            console.log(URL);
            let response = await fetch(URL);
            let data = await response.json();
            console.log(data);

        } catch (e) {
            console.log("error", e);
        }
        this.handleClearForm();
    }



    triggerChildAlert = () => {
        this.setState({ result: true });
    };

    render() {
        return (
            <div className="search-splash">
                <div className="welcome ">
                    <h1 className="page-header-one splash-title">GetYourWay</h1>
                </div>
                <div className="searchPanel">
                    <div className="panelHeader">
                        <div id="header">
                            <Link to="https://www.sky.com" className="login-logo" />
                        </div>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="location-search d-flex p-3">
                            <label>Your number: </label>
                            <PlacesAutocomplete
                                value={this.state.fromAddress}
                                onChange={this.fromHandleChange}
                                onSelect={this.fromHandleSelect}
                            >
                                {({
                                      getInputProps,
                                      suggestions,
                                      getSuggestionItemProps,
                                      loading
                                  }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: "Search Places ...",
                                                className: "location-search-input"
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? "suggestion-item--active"
                                                    : "suggestion-item";
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                        <div className="location-search d-flex p-3">
                            <label>To: </label>
                            <PlacesAutocomplete
                                value={this.state.toAddress}
                                onChange={this.toHandleChange}
                                onSelect={this.toHandleSelect}
                            >
                                {({
                                      getInputProps,
                                      suggestions,
                                      getSuggestionItemProps,
                                      loading
                                  }) => (
                                    <form>
                                        <p>Enter your number:</p>
                                        <input
                                            type="text"
                                            onChange={this.handleChangeNumber}
                                        />
                                        <input
                                            type='submit'
                                        >Send me a text</input>
                                    </form>
        );
    }
}
export default sms;
