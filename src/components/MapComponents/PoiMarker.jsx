import { useCallback, useState } from "react";
import { useMap, AdvancedMarker, Pin, Marker } from "@vis.gl/react-google-maps";
import Circle from "./Circle";

const PoiMarker = ({ key, location }) => {
  const map = useMap();
  const [circleCenter, setCircleCenter] = useState(null);

  const handleClick = useCallback(
    (ev, poiKey) => {
      if (!map) return;
      if (!ev.latLng) return;

      setCircleCenter(ev.latLng);
      // console.log("marker clicked:", ev.latLng.toString());
      // console.log("POI Key:", poiKey);
      map.panTo(ev.latLng);
    },
    [map]
  );

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
        key={key}
        position={location}
        clickable={true}
        onClick={(ev) => handleClick(ev, key)}
        icon={{
          url: "/assets/ic_MapIcon.png",
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
        }}
      />
    </>
  );
};

export default PoiMarker;
