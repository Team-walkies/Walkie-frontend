import React, { useCallback, useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";

import myloc from "../../assets/icons/toMyLoc.png";
import PoiMarkers from "./PoiMarkers";
import UserMarker from "./UserMarker";
import Header from "./Header";
import styled from "styled-components";

const ToCurrent = styled.div`
  width: 40px;
  height: 40px;
  position: fixed;
  top: 12px;
  right: 24px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
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

const GoogleMaps = () => {
  // const [center, setCenter] = useState({ lat: -33.860664, lng: 151.208138 });
  const [center, setCenter] = useState({ lat: 37.6766464, lng: 126.7695616 });
  const [heading, setHeading] = useState(0); // 🔄 핸드폰 방향
  const map = useMap();

  const locations = [
    { key: "ilsanLakePark", location: { lat: 37.675418, lng: 126.769645 } }, // 일산 호수공원
    { key: "kintex", location: { lat: 37.667265, lng: 126.745635 } }, // 킨텍스 (국제 전시장)
    { key: "lafesta", location: { lat: 37.661486, lng: 126.768109 } }, // 라페스타 쇼핑몰
    { key: "westernDome", location: { lat: 37.662223, lng: 126.770752 } }, // 웨스턴돔 (맛집 거리)
    { key: "oneMount", location: { lat: 37.660203, lng: 126.752867 } }, // 원마운트 (워터파크 & 스노우파크)
    { key: "aquaPlanet", location: { lat: 37.660748, lng: 126.753944 } }, // 아쿠아플라넷 일산
    {
      key: "hyundaiDepartmentStore",
      location: { lat: 37.646979, lng: 126.788208 },
    }, // 현대백화점 킨텍스점
    {
      key: "gomsoSaltedShrimpMarket",
      location: { lat: 37.683312, lng: 126.763159 },
    }, // 고양종합운동장
    {
      key: "donggukUniversityIlsanHospital",
      location: { lat: 37.673467, lng: 126.780789 },
    }, // 동국대학교 일산병원
    {
      key: "hallymUniversityMedicalCenter",
      location: { lat: 37.67606, lng: 126.771648 },
    }, // 한림대학교 동탄성심병원
    { key: "goyangCityHall", location: { lat: 37.656364, lng: 126.831722 } }, // 고양시청
    { key: "jeongbalsanPark", location: { lat: 37.661574, lng: 126.777272 } }, // 정발산공원
    { key: "hyangdongPark", location: { lat: 37.689079, lng: 126.765995 } }, // 향동공원
    { key: "pungdongPark", location: { lat: 37.673939, lng: 126.75945 } }, // 풍동공원
    { key: "nokcheonPark", location: { lat: 37.687542, lng: 126.75369 } }, // 녹천공원
  ];

  useEffect(() => {
    // 🌍 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          if (map)
            map.panTo({
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

    // 📱 핸드폰 방향 감지
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
  }, [map]);

  return (
    <div>
      <Header map={map} center={center} />
      <ToCurrent
        onClick={() => {
          map.panTo(center);
        }}
      >
        <img src={myloc} />
      </ToCurrent>
      <Map
        mapId={"91cb6cea28939556"}
        defaultCenter={center}
        defaultZoom={15}
        style={{ width: "100%", height: "400px" }}
        options={{
          disableDefaultUI: true,
          zoomControl: true, // 확대/축소 버튼 활성화
          maxZoom: 20,
          minZoom: 15,
          streetViewControl: false,
          mapTypeControl: false,
          clickableIcons: false,
        }}
      >
        <UserMarker center={center} heading={heading} />
        <PoiMarkers pois={locations} />
      </Map>
    </div>
  );
};

export default GoogleMaps;
