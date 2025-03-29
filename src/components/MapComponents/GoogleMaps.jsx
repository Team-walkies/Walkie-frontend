import React, { useCallback, useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";

import myloc from "../../assets/icons/toMyloc.png";
import PoiMarkers from "./PoiMarkers";
import UserMarker from "./UserMarker";
import Header from "./Header";
import styled from "styled-components";
import BottomSheet from "../UI/BottomSheet";
import PoiMarker from "./PoiMarker";
import { useRecoilState, useResetRecoilState } from "recoil";
import { destinationState, geolocationState } from "../../utils/atoms";
import { findNearbySpots, getSpotDetail } from "../../api/spotAPI";

const ToCurrent = styled.div`
  justify-self: end;
  width: 40px;
  height: 40px;
  position: absolute;
  /* right: 16px;
  top: 48px; */
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;

  /* bottom: 8px; */
  right: 16px;
  bottom: ${(props) => (props.selected ? "308px" : "8px")};
  transition: bottom 0.3s ease-in-out;

  align-items: center;
  z-index: 30;
  box-shadow:
    0px 4px 6px rgba(0, 0, 0, 0.1),
    0px 1px 3px rgba(0, 0, 0, 0.08);

  img {
    width: 24px;
    height: 24px;
  }
`;
const InfoBox = styled.div`
  position: absolute;
  top: 52px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* 화면 전체 높이 */
`;

const BlackInfo = styled.div`
  background-color: ${(props) => props.theme.colors.gray700};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  border-radius: 99px;
`;

const GoogleMaps = () => {
  const [center, setCenter] = useRecoilState(geolocationState);
  const [heading, setHeading] = useState(0); // 🔄 핸드폰 방향
  const [selected, setSelected] = useState(null); // selected to hold null initially
  const [spotType, setSpotType] = useState("");
  const resetDestinationState = useResetRecoilState(destinationState);
  const [spots, setSpots] = useState([]);

  const map = useMap();

  const isValidLocation = (location) => {
    return location && !isNaN(location.lat) && !isNaN(location.lng);
  };

  useEffect(() => {
    // console.clear();
    // 위치 정보가 제대로 설정되지 않았으면 return
    if (!isValidLocation(center)) {
      return;
    }

    // if (map) {
    //   map.setCenter(center); // 유효한 위치 값으로만 맵을 설정
    // }
  }, [center, map]); // center나 map이 변경될 때마다 실행

  //데이터 페칭
  useEffect(() => {
    console.log("center:", center);

    const fetchNearbySpots = async () => {
      const response = await findNearbySpots(center.lat, center.lng);
      setSpots(response);
    };

    fetchNearbySpots();
  }, []);

  //기존 데이터 삭제
  useEffect(() => {
    resetDestinationState();

    // localStorage에서 recoil-persist의 destinationState만 삭제
    const persistedState = localStorage.getItem("recoil-persist");
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      delete parsedState.destinationState;
      localStorage.setItem("recoil-persist", JSON.stringify(parsedState));
    }

    console.log("destinationState가 초기화되었습니다.");
  }, [resetDestinationState]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (!isNaN(latitude) && !isNaN(longitude)) {
            setCenter({
              lat: latitude,
              lng: longitude,
            });
          } else {
            console.error("Invalid geolocation data");
          }
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation이 지원되지 않습니다.");
    }

    const handleOrientation = (event) => {
      if (event.alpha !== null) {
        setHeading(event.alpha); // 0~360도 (북쪽 기준)
      }
    };
    window.addEventListener("deviceorientationabsolute", handleOrientation);

    return () => {
      window.removeEventListener(
        "deviceorientationabsolute",
        handleOrientation
      );
    };
  }, []);

  // useEffect(() => {
  //   console.log("selected", selected);
  // }, [selected]);

  const handleMapClick = () => {
    setSelected(null);
    setSpotType("");
  };

  return (
    <div>
      {selected ? (
        <BottomSheet
          spotId={selected.spotId}
          closeFn={setSelected}
          name={selected.key}
          loc={selected.location}
          map={map}
          center={center}
          type={spotType}
        />
      ) : null}

      {center && <Header map={map} center={center} />}
      <InfoBox>
        <BlackInfo>
          <span className="c1" style={{ color: "var(--gray-50)" }}>
            1시간내 거리
          </span>
          <span className="c1" style={{ color: "var(--blue-200)" }}>
            {spots.length}개
          </span>
        </BlackInfo>
      </InfoBox>

      <ToCurrent selected={selected} onClick={() => map.panTo(center)}>
        <img src={myloc} alt="현재 위치로 이동" />
      </ToCurrent>

      <MapContainer>
        <Map
          mapId={"91cb6cea28939556"}
          defaultCenter={center}
          defaultZoom={15}
          style={{ width: "100%", height: "100%" }}
          options={{
            disableDefaultUI: true,
            maxZoom: 20,
            minZoom: 15,
            streetViewControl: false,
            mapTypeControl: false,
            clickableIcons: false,
            gestureHandling: "greedy",
            zoomControl: false,
          }}
          onClick={handleMapClick}
        >
          {center && <UserMarker center={center} heading={heading} />}
          {/* {locations.map((loc) => (
            <PoiMarker
              key={loc.key}
              name={loc.key}
              poiKey={loc.key}
              location={loc.location}
              clickFn={setSelected}
              map={map}
              selectedPoiKey={selected ? selected.key : null}
            />
          ))} */}
          {spots.map((loc) => (
            <PoiMarker
              key={loc.id}
              name={loc.locationName}
              poiKey={loc.locationName}
              location={{ lat: loc.latitude, lng: loc.longitude }}
              clickFn={setSelected}
              setType={setSpotType}
              map={map}
              selectedPoiKey={selected ? selected.key : null}
              type={loc.type}
              spotId={loc.id}
            />
          ))}
        </Map>
      </MapContainer>
    </div>
  );
};

export default GoogleMaps;
