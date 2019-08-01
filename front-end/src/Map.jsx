import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class Maps{
render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
          <Marker position={{ lat: 48.00, lng: -122.00}}
        />
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBktdACICn5zDhtfxywVJRRUuB53aE1V-I'
})(MapContainer);

const mapStyles = {
  width: '50%',
  height: '50%',
};


