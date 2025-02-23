import { useCallback, useState } from "react";
import { useMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import Circle from "./Circle";

const PoiMarkers = (props) => {
  const map = useMap();
  const [circleCenter, setCircleCenter] = useState(null);

  const handleClick = useCallback(
    (ev) => {
      if (!map) return;
      if (!ev.latLng) return;

      setCircleCenter(ev.latLng);
      console.log("marker clicked:", ev.latLng.toString());
      map.panTo(ev.latLng);
    },
    [map]
  );

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
          onClick={(ev) => {
            handleClick(ev);
            console.log(poi.key);
          }}
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

export default PoiMarkers;
