import React, { useState, useEffect } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import styled from "styled-components";
import myloc from "../../assets/icons/toMyLoc.png";
import UserMarker from "./UserMarker";
import PoiMarker from "./PoiMarker";
import Header from "./Header";

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

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const WalkMaps = ({ destination }) => {
  const tmapApiKey = import.meta.env.VITE_TMAP_API_KEY;

  const [center, setCenter] = useState({ lat: 37.6766464, lng: 126.7695616 });
  const [heading, setHeading] = useState(0);
  const [directions, setDirections] = useState(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [selected, setSelected] = useState("");
  const [route, setRoute] = useState([]);

  const map = useMap();

  useEffect(() => {
    const checkGoogleLoaded = () => {
      if (window.google && window.google.maps) {
        setIsGoogleLoaded(true);
      } else {
        console.log("Google Maps API not loaded yet");
      }
    };

    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(interval);
        checkGoogleLoaded();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isGoogleLoaded) {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            if (map) {
              map.panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            }
          },
          (error) => console.error("Geolocation error:", error),
          { enableHighAccuracy: true }
        );
      } else {
        alert("Geolocation is not supported.");
      }
    }
  }, [isGoogleLoaded, map]);

  useEffect(() => {
    if (center && destination) {
      const fetchTmapPedestrianRoute = async () => {
        const startX = center.lng.toFixed(6);
        const startY = center.lat.toFixed(6);
        const endX = destination.lng.toFixed(6);
        const endY = destination.lat.toFixed(6);

        const apiUrl = `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1`;

        const requestBody = {
          startX: startX,
          startY: startY,
          endX: endX,
          endY: endY,
          reqCoordType: "WGS84GEO", // 기본 좌표계 설정
          resCoordType: "WGS84GEO", // 응답 좌표계 설정
          angle: 0, // 각도 (기본값 0)
          speed: 10, // 진행 속도 (기본값 10 km/h)
          searchOption: 0, // 경로 탐색 옵션 (기본값 0)
          startName: encodeURIComponent("출발지"), // 출발지 이름 URL 인코딩
          endName: encodeURIComponent("목적지"), // 목적지 이름 URL 인코딩
          sort: "index", // 정렬 옵션 (기본값 index)
        };

        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // 요청 데이터 형식
              Accept: "application/json", // 응답 형식 설정
              appKey: tmapApiKey, // 앱키 추가
            },
            body: JSON.stringify(requestBody),
          });
          const data = await response.json();
          console.log("Tmap API response:", data);

          if (data.features && data.features.length > 0) {
            const routePath = data.features
              .filter((feature) => feature.geometry.type === "LineString")
              .map((feature) => feature.geometry.coordinates);

            setRoute(routePath); // 경로 정보 저장
          }
        } catch (error) {
          console.error("Error fetching Tmap pedestrian route:", error);
        }
      };

      fetchTmapPedestrianRoute();
    }
  }, [center, destination]);

  useEffect(() => {
    console.log("route", route);
    if (route.length > 0 && map) {
      // 경로를 Polyline으로 지도에 추가
      route.forEach((coordinates) => {
        const path = coordinates.map(([lng, lat]) => ({ lat, lng }));
        const polyline = new window.google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#70cfff",
          strokeOpacity: 0.3,
          strokeWeight: 5,
        });

        polyline.setMap(map); // 경로를 지도에 추가
      });
    }
  }, [route, map]);

  const handleMapClick = () => {
    setSelected(null);
  };

  return (
    <div>
      <Header map={map} center={center} />

      <ToCurrent onClick={() => map.panTo(center)}>
        <img src={myloc} alt="Move to current location" />
      </ToCurrent>

      <MapContainer>
        <Map
          mapId={"91cb6cea28939556"}
          defaultCenter={center}
          defaultZoom={15}
          style={{ width: "100%", height: "100%" }}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
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
          <PoiMarker isDestination={true} location={destination} map={map} />
        </Map>
      </MapContainer>
    </div>
  );
};

export default WalkMaps;
