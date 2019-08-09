/* global google */
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  Polyline,
  lineSymbol,
  Point,
  Projection
} from "react-google-maps";
import { Map, GoogleApiWrapper } from "google-maps-react";
import React, { Component, Fragment } from "react";
import { compose, withProps, lifecycle } from "recompose";

const google = (window.google = window.google ? window.google : {});

class MapsDirection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: "",
      duration: ""
    };
  }
  render() {
    var routed;
    var origina;
    var originn;
    var destinationa;
    var destinationn;
    var travel_mode;

    try {
      routed = JSON.parse(localStorage.getItem("mapRequest"));
      origina = routed.startLatitude;
      originn = routed.startLongitude;
      destinationa = routed.endLatitude;
      destinationn = routed.endLongitude;
      this.state.duration = routed.routeDetails.split(",")[0];
      this.state.distance = routed.routeDetails.split(",")[1];

      if (routed.transportMethod === "d") {
        travel_mode = "DRIVING";
      }
      if (routed.transportMethod === "w") {
        travel_mode = "WALKING";
      }
      if (routed.transportMethod === "b") {
        travel_mode = "BICYCLING";
      }
      if (routed.transportMethod === "t") {
        travel_mode = "TRANSIT";
      }
    } catch (e) {
      origina = 51.507309;
      originn = -0.128012;
      destinationa = 51.488999;
      destinationn = -0.328587;
      travel_mode = "DRIVING";
      this.state.duration =
        "your search failed, please try again being more precise.";
    }

    const DirectionsComponent = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_API
        }`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const DirectionsService = new google.maps.DirectionsService();

          DirectionsService.route(
            {
              origin: new google.maps.LatLng(origina, originn),
              destination: new google.maps.LatLng(destinationa, destinationn),
              travelMode: google.maps.TravelMode[travel_mode]
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: { ...result },
                  markers: true
                });
              } else {
                console.error("error fetching directions " + status);
              }
            }
          );
        }
      })
    )(props => (
      <div>
        {" "}
        <div id="main-map">
          <GoogleMap
            defaultCenter={{ lat: 51.488999, lng: -0.328587 }}
            defaultZoom={3}
          >
            {props.directions && (
              <DirectionsRenderer directions={props.directions} />
            )}
          </GoogleMap>
          <div className="rounded-pill p-1 m-1 travel-info d-flex">
            <h3>
              {" "}
              <i className="far fa-clock p-1" />
              {this.state.duration}
            </h3>
            <h3>
              {this.state.distance}
              <i className="fas fa-shoe-prints p-1" />
            </h3>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <DirectionsComponent
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default MapsDirection;
