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
import BottomSheet from "../UI/BottomSheet";

const ToCurrent = styled.div`
  justify-self: end;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 16px;
  top: 48px;
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
      <BottomSheet />
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

      <ToCurrent onClick={() => map.panTo(center)}>
        <img src={myloc} alt="현재 위치로 이동" />
      </ToCurrent>

      <MapContainer>
        <Map
          mapId={"91cb6cea28939556"}
          defaultCenter={center}
          defaultZoom={15}
          style={{ width: "100%", height: "100%" }} // 💡 높이를 전체로
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            maxZoom: 20,
            minZoom: 15,
            streetViewControl: false,
            mapTypeControl: false,
            clickableIcons: false,
            gestureHandling: "greedy",
            // streetViewControl: false, // 스트리트 뷰 제거
            zoomControl: false, // 확대/축소 버튼 제거
          }}
        >
          <UserMarker center={center} heading={heading} />
          <PoiMarkers pois={locations} />
        </Map>
      </MapContainer>
    </div>
  );
};

export default GoogleMaps;
