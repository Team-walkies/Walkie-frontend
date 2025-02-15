import React, { useCallback, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import Circle from "./Circle";

// const center = { lat: 37.5665, lng: 126.978 }; // 서울
const center = { lat: -33.860664, lng: 151.208138 };

const GoogleMaps = () => {
  const locations = [
    { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
    { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
    { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
    { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
    { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
    { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
    { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
    { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
    { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
    { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
    { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
    {
      key: "kingStreetWharf",
      location: { lat: -33.8665445, lng: 151.1989808 },
    },
    { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
    { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
    { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
  ];

  const center = { lat: -33.860664, lng: 151.208138 };
  const map = useMap();

  const PoiMarkers = (props) => {
    const [circleCenter, setCircleCenter] = useState(null);
    const handleClick = useCallback((ev) => {
      if (!map) return;
      if (!ev.latLng) return;
      setCircleCenter(ev.latLng);
      console.log("marker clicked:", ev.latLng.toString());
      map.panTo(ev.latLng);
    });
    return (
      <>
        <Circle
          radius={100}
          center={circleCenter}
          strokeColor={"#0c4cb3"}
          strokeOpacity={1}
          strokeWeight={3}
          fillColor={"#3b82f6"}
          fillOpacity={0.3}
        />
        {props.pois.map((poi) => (
          <AdvancedMarker
            key={poi.key}
            position={poi.location}
            clickable={true}
            onClick={handleClick}
          >
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        ))}
      </>
    );
  };

  return (
    <Map
      mapId={"91cb6cea28939556"}
      defaultCenter={center}
      defaultZoom={12}
      style={{ width: "100%", height: "400px" }}
    >
      <PoiMarkers pois={locations} />
      {/* <Marker position={center} /> */}
    </Map>
  );
};

export default GoogleMaps;
