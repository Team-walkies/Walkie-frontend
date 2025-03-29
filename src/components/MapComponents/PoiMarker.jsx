import { useCallback, useEffect, useState } from "react";
import { useMap, AdvancedMarker, Pin, Marker } from "@vis.gl/react-google-maps";
import Circle from "./Circle";

const PoiMarker = ({
  map,
  poiKey,
  name,
  location,
  clickFn,
  setType,
  selectedPoiKey,
  isDestination,
  type,
  spotId,
}) => {
  const [circleCenter, setCircleCenter] = useState(null);

  let assetURL;

  if (type == "PARK") {
    assetURL = "/assets/ic_MapIcon.png";
  } else if (type == "CAFE") {
    assetURL = "/assets/coffeeIcon.png";
  } else if (type == "ETC") {
    assetURL = "/assets/flagIcon.png";
  }

  useEffect(() => {
    isDestination ? setCircleCenter(location) : null;
  }, []);

  const handleClick = useCallback(
    (ev) => {
      if (!map || !ev.latLng) return;

      const selectedPoi = {
        key: poiKey,
        location: { lat: ev.latLng.lat(), lng: ev.latLng.lng() },
        spotId: spotId,
      };

      clickFn(selectedPoi); // 지도에서 클릭한 장소를 선택하는 함수
      setType(type); // 타입을 설정하는 함수

      map.panTo(ev.latLng);
    },
    [map, poiKey, location, clickFn, setType, type] // 의존성 배열에 setType과 type 추가
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
          url: assetURL,
          scaledSize: new window.google.maps.Size(
            isSelected && !isDestination ? 40 : 28,
            isSelected && !isDestination ? 40 : 28
          ), // Change size if selected
          anchor: new window.google.maps.Point(
            isSelected && !isDestination ? 20 : 14,
            isSelected && !isDestination ? 20 : 14
          ),
        }}
      />
    </>
  );
};

export default PoiMarker;
