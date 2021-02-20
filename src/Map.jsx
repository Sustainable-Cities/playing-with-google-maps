import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const markers = [
  {
    address: "boston",
    lat: 42.3601,
    lng: -71.0589,
  },
  {
    address: "boston",
    lat: 16.2884,
    lng: -122.8233,
  },
  {
    address: "boston",
    lat: 15.2884,
    lng: 34.8233,
  },
  {
    address: "boston",
    lat: 73.2884,
    lng: 69.8233,
  },
  {
    address: "boston",
    lat: -14.2884,
    lng: -64.8233,
  },
];

export function MapContainer(props) {
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const { google } = props;

  const onMarkerClick = (props, marker, e) => {
    console.log(props);
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onClose = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: 42.3601,
        lng: -71.0589,
      }}
    >
      {markers.map((marker, index) => (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          name={marker.address}
          onClick={onMarkerClick}
          key={index}
        />
      ))}
      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4>{selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLEMAPS_KEY}`,
})(MapContainer);
