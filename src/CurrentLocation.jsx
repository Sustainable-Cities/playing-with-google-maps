import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
};

export default function CurrentLocation(props) {
  const { lat, lng } = props.initialCenter;
  const [currentLocation, setCurrentLocation] = useState({
    currentLocation: {
      lat: lat,
      lng: lng,
    },
  });

  const loadMap = () => {};

  const recenterMap = () => {
    const map = map;
    const current = currentLocation;
    const google = props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  };

  useEffect((prevProps, prevState) => {
    if (prevProps.google != props.google) {
      loadMap();
    }
    if (prevState.currentLocation != currentLocation) {
      recenterMap();
    }
  }, []);

  return <div></div>;
}

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};
