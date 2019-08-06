import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { Component } from "react";
// import CurrentLocation from './CurrentMapLocation';

const mapStyles = {
  width: "75%",
  height: "75%"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  };

  //  onMarkerClick = (props, marker, e) =>
  //     this.setState({
  //       selectedPlace: props,
  //       activeMarker: marker,
  //       showingInfoWindow: true
  //     });

  // onClose = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

  render() {
    let mapP;
    var route;

    try {
      route = JSON.parse(localStorage.getItem("mapRequest"));
      console.log(JSON.stringify(route));
      console.log(route.startLatitude);
      console.log("working");
      mapP = (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 51.507309, lng: -0.128012 }}
        >
          <Marker
            position={{
              lat: String(route.startLatitude),
              lng: String(route.startLongitude)
            }}
          />
        </Map>
      );
    } catch (e) {
      mapP = (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 51.507309, lng: -0.128012 }}
        />
      );
    }

    return <div> {mapP}</div>;
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBktdACICn5zDhtfxywVJRRUuB53aE1V-I"
})(MapContainer);
