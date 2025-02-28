import { useCallback, useState } from "react";
import { useMap, AdvancedMarker, Pin, Marker } from "@vis.gl/react-google-maps";
import Circle from "./Circle";
const PoiMarker = ({ map, poiKey, location, clickFn }) => {
  // key → poiKey로 변경
  const [circleCenter, setCircleCenter] = useState(null);

  const handleClick = useCallback(
    (ev) => {
      if (!map || !ev.latLng) return;

      const selectedPoi = {
        key: poiKey, // 수정된 key 사용
        location: { lat: ev.latLng.lat(), lng: ev.latLng.lng() },
      };

      clickFn(selectedPoi);

      setCircleCenter(ev.latLng);
      map.panTo(ev.latLng);
    },
    [map, poiKey, location, clickFn]
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
        position={location}
        clickable={true}
        onClick={handleClick}
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
