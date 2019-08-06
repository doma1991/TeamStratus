/* global google */
import { withGoogleMap, withScriptjs, GoogleMap, DirectionsService, DirectionsRenderer, Marker,Polyline, lineSymbol,Point, Projection} from 'react-google-maps';
import React, { Component , Fragment} from 'react';

import {compose, withProps,lifecycle} from 'recompose';





const google = window.google  = window.google ? window.google : {}



class MapsDirection extends React.Component{
constructor(props){
super(props)
}
render(){

const{origina, originn,destinationa,destinationn,travelmode}=this.props;


const DirectionsComponent =compose(
withProps({
googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBktdACICn5zDhtfxywVJRRUuB53aE1V-I&callback=initMap",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {

    const DirectionsService = new google.maps.DirectionsService();


    DirectionsService.route(

{
 origin: new google.maps.LatLng(51.507309, -0.128012),
    destination: new google.maps.LatLng(51.488999, -0.328587),
    travelMode: google.maps.TravelMode.DRIVING
},
(result, status) => {
if(status === google.maps.DirectionsStatus.OK){
    this.setState({
    directions: {...result},
    markers:true
    });

} else{
    console.error('error fetching directions '+status);
}
}

    );

  }})


  )(props => <div> <div  id="main-map">
      <GoogleMap
        defaultCenter={{ lat: 51.488999, lng: -0.328587 }}
        defaultZoom={3}
      >
        {props.directions && <DirectionsRenderer
          directions={props.directions} />}

      </GoogleMap>
      </div>
      </div>
    );

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