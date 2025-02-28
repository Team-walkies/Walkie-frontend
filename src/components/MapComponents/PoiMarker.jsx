import { useCallback, useEffect, useState } from "react";
import { useMap, AdvancedMarker, Pin, Marker } from "@vis.gl/react-google-maps";
import Circle from "./Circle";

const PoiMarker = ({
  map,
  poiKey,
  name,
  location,
  clickFn,
  selectedPoiKey,
  isDestination,
}) => {
  const [circleCenter, setCircleCenter] = useState(null);

  // console.log(name);

  useEffect(() => {
    isDestination ? setCircleCenter(location) : null;
  }, []);

  const handleClick = useCallback(
    (ev) => {
      if (!map || !ev.latLng) return;

      const selectedPoi = {
        key: poiKey,
        location: { lat: ev.latLng.lat(), lng: ev.latLng.lng() },
      };

      clickFn(selectedPoi);

      map.panTo(ev.latLng);
    },
    [map, poiKey, location, clickFn]
  );

  const isSelected = selectedPoiKey === poiKey;

  return (
    <>
      <Circle
        radius={100}
        center={circleCenter}
        strokeColor={"#0daeff"}
        strokeOpacity={1}
        strokeWeight={0}
        fillColor={"#0daeff"}
        fillOpacity={0.15}
      />
      <Marker
        position={location}
        clickable={true}
        onClick={handleClick}
        icon={{
          url: "/assets/ic_MapIcon.png",
          scaledSize: new window.google.maps.Size(
            isSelected && !isDestination ? 60 : 40,
            isSelected && !isDestination ? 60 : 40
          ), // Change size if selected
          anchor: new window.google.maps.Point(
            isSelected && !isDestination ? 30 : 20,
            isSelected && !isDestination ? 30 : 20
          ),
        }}
      />
    </>
  );
};

export default PoiMarker;
