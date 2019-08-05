
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React, { Component } from 'react';
import CurrentLocation from './CurrentMapLocation';

const mapStyles = {
  width: '50%',
  height: '50%',
};

export class MapContainer extends Component{

   state = {
    showingInfoWindow: false,  //Hides or shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

   onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });

    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };


    render() {
      return (
          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176}}
          />
      );
    }
  

  }



export default GoogleApiWrapper({
  apiKey: 'AIzaSyBktdACICn5zDhtfxywVJRRUuB53aE1V-I'
})(MapContainer);



