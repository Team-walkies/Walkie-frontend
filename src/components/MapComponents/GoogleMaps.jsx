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

  const map = useMap();

  // useEffect(() => {
  //   console.log("center:", center);
  //   findNearbySpots(center.lat, center.lng);
  //   getSpotDetail(12);
  // }, []);

  const resetDestinationState = useResetRecoilState(destinationState);

  useEffect(() => {
    // destinationState 리셋
    resetDestinationState();

    // localStorage에서 recoil-persist의 destinationState만 삭제
    const persistedState = localStorage.getItem("recoil-persist");
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      // destinationState만 삭제
      delete parsedState.destinationState;
      // localStorage에 새롭게 저장
      localStorage.setItem("recoil-persist", JSON.stringify(parsedState));
    }

    console.log("destinationState가 초기화되었습니다.");
  }, [resetDestinationState]);

  const locations = [
    { key: "ilsanLakePark", location: { lat: 37.675418, lng: 126.769645 } },
    { key: "kintex", location: { lat: 37.667265, lng: 126.745635 } },
    { key: "lafesta", location: { lat: 37.661486, lng: 126.768109 } },
    { key: "westernDome", location: { lat: 37.662223, lng: 126.770752 } },
    { key: "oneMount", location: { lat: 37.660203, lng: 126.752867 } },
    { key: "aquaPlanet", location: { lat: 37.660748, lng: 126.753944 } },
    { key: "우리집", location: { lat: 37.6763, lng: 126.7728384 } },
    {
      key: "hyundaiDepartmentStore",
      location: { lat: 37.646979, lng: 126.788208 },
    },
    {
      key: "gomsoSaltedShrimpMarket",
      location: { lat: 37.683312, lng: 126.763159 },
    },
    {
      key: "donggukUniversityIlsanHospital",
      location: { lat: 37.673467, lng: 126.780789 },
    },
    {
      key: "hallymUniversityMedicalCenter",
      location: { lat: 37.67606, lng: 126.771648 },
    },
    { key: "goyangCityHall", location: { lat: 37.656364, lng: 126.831722 } },
    { key: "jeongbalsanPark", location: { lat: 37.661574, lng: 126.777272 } },
    { key: "hyangdongPark", location: { lat: 37.689079, lng: 126.765995 } },
    { key: "pungdongPark", location: { lat: 37.673939, lng: 126.75945 } },
    { key: "abc", location: { lat: 37.6763, lng: 126.7692616 } },
  ];

  const spot = [
    {
      id: 12,
      locationName: "문화공원",
      type: "PARK",
      latitude: 37.6757,
      longitude: 126.7649,
    },
    {
      id: 13,
      locationName: "강재공원",
      type: "PARK",
      latitude: 37.6735,
      longitude: 126.7634,
    },
    {
      id: 14,
      locationName: "이물재공원",
      type: "PARK",
      latitude: 37.6737,
      longitude: 126.7713,
    },
    {
      id: 15,
      locationName: "일산호수공원",
      type: "PARK",
      latitude: 37.6573,
      longitude: 126.7638,
    },
    {
      id: 16,
      locationName: "고양종합운동장",
      type: "ETC",
      latitude: 37.677,
      longitude: 126.743,
    },
    {
      id: 17,
      locationName: "성저공원",
      type: "PARK",
      latitude: 37.6816,
      longitude: 126.7551,
    },
    {
      id: 18,
      locationName: "밤리단길 카페메노",
      type: "CAFE",
      latitude: 37.6727,
      longitude: 126.7737,
    },
    {
      id: 19,
      locationName: "LAKE",
      type: "CAFE",
      latitude: 37.672,
      longitude: 126.7589,
    },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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
  //   console.log(selected);
  // }, [selected]);

  const handleMapClick = () => {
    setSelected(null);
    setSpotType("");
  };

  return (
    <div>
      {selected ? (
        <BottomSheet
          closeFn={setSelected}
          name={selected.key}
          loc={selected.location}
          map={map}
          center={center}
          type={spotType}
        />
      ) : null}

      <Header map={map} center={center} />
      <InfoBox>
        <BlackInfo>
          <span className="c1" style={{ color: "var(--gray-50)" }}>
            1시간내 거리
          </span>
          <span className="c1" style={{ color: "var(--blue-200)" }}>
            {locations.length}개
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
          <UserMarker center={center} heading={heading} />
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
          {spot.map((loc) => (
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
            />
          ))}
        </Map>
      </MapContainer>
    </div>
  );
};

export default GoogleMaps;
