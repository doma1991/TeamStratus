/* global google */
import { withGoogleMap, withScriptjs, GoogleMap, DirectionsService, DirectionsRenderer } from 'react-google-maps';
import React, { Component } from 'react';
import CurrentLocation from './CurrentMapLocation';




const mapStyles = {
  width: '75%',
  height: '75%',
};

const google=window.google  = window.google ? window.google: {};
var routed;
var origin;
var destination;
var travel_mode;

try{
routed= JSON.parse(localStorage.getItem("mapRequest"));
origin= { lat: routed.startLatitude, lng: routed.startLongitude};
destination= { lat: routed.endLatitude, lng: routed.endLongitude};
travel_mode= google.maps.TravelMode.DRIVING;

}

catch(e){
origin= {lat: 51.507309, lng: -0.128012 };
destination = { lat:51.488999, lng:-0.328587};
travel_mode=google.maps.TravelMode.TRANSIT;
}


class MapsDirection extends Component{
constructor(props){
super(props)
}
render(){
state = {
    directions: null
  };

  componentDidMount() {
    var directionsService = new google.maps.DirectionsService();


    directionsService.route(



{
origin: origin,
destination: destination,
travelMode: travel_mode
},
(result, status) => {
if(status === google.maps.DirectionsStatus.OK){
    this.setState({
    directions: result
    });
} else{
    console.error('error fetching directions${results}');
}
}

    );

  }


    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 51.488999, lng: -0.328587 }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );

}
}

export default MapsDirection;