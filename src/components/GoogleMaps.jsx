import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const center = { lat: 37.5665, lng: 126.978 }; // 서울

const GoogleMaps = () => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map center={center} zoom={12} style={{ width: "100%", height: "400px" }}>
        <Marker position={center} />
      </Map>
    </APIProvider>
  );
};

export default GoogleMaps;
