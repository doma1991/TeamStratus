import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAddress: "",
      fromCity: "",
      fromCountry: "",
      toAddress: "",
      toCity: "",
      toCountry: ""
    };
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
    console.log(typeof currAddress);
    let result = [];
    result = currAddress.split(",");
    console.log(result);
    let i = result.length;
    let j = i - 1;
    let fromCity = result[0].trim();
    let fromCountry = result[j].trim();
    console.log(fromCity);
    console.log(fromCountry);
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
    console.log(typeof currAddress);
    let result = [];
    result = currAddress.split(",");
    console.log(result);
    let i = result.length;
    let j = i - 1;
    let toCity = result[0].trim();
    let toCountry = result[j].trim();
    console.log(toCity);
    console.log(toCountry);
    this.setState({ toCity: toCity });
    this.setState({ toCountry: toCountry });

    //strip white splace then concat. the city and country//
  };

  render() {
    return (
      <div>
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
    );
  }
}

export default LocationSearchInput;
