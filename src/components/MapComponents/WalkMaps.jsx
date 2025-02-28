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
  // 티맵 API 키
  const tmapApiKey = import.meta.env.VITE_TMAP_API_KEY;

  const [center, setCenter] = useState({ lat: 37.6766464, lng: 126.7695616 });
  const [heading, setHeading] = useState(0); // 핸드폰 방향
  const [directions, setDirections] = useState(null); // 경로 저장 상태
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false); // Google Maps 로드 상태
  const [selected, setSelected] = useState("");

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
        alert("Geolocation이 지원되지 않습니다.");
      }
    }
  }, [isGoogleLoaded, map]);

  useEffect(() => {
    if (center && destination && isGoogleLoaded) {
      const fetchTmapRoute = async () => {
        console.log(
          `startX: ${center.lng.toFixed(6)}, startY: ${center.lat.toFixed(6)}`
        );
        console.log(
          `endX: ${destination.lng.toFixed(6)}, endY: ${destination.lat.toFixed(6)}`
        );
        console.log(
          `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${tmapApiKey}&startX=${center.lng.toFixed(6)}&startY=${center.lat.toFixed(6)}&endX=${destination.lng.toFixed(6)}&endY=${destination.lat.toFixed(6)}&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&angle=0&trafficInfo=false`
        );

        const origin = `${center.lng},${center.lat}`; // 경도, 위도 순으로 수정
        const dest = `${destination.lng},${destination.lat}`; // 경도, 위도 순으로 수정

        try {
          const response = await fetch(
            `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${tmapApiKey}&startX=${center.lng.toFixed(6)}&startY=${center.lat.toFixed(6)}&endX=${destination.lng.toFixed(6)}&endY=${destination.lat.toFixed(6)}&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&angle=0&trafficInfo=false`
          );
          const data = await response.json();
          if (data && data.features && data.features.length > 0) {
            const route = data.features[0].geometry.coordinates;
            setDirections(route);
          } else {
            console.error("티맵 경로를 가져오는 데 실패했습니다.");
          }
        } catch (error) {
          console.error("티맵 API 호출 중 오류 발생:", error);
        }
      };

      fetchTmapRoute();
    }
  }, [center, destination, isGoogleLoaded]);

  useEffect(() => {
    if (directions && map) {
      const polyline = new google.maps.Polyline({
        path: directions.map((coord) => ({
          lat: coord[1], // 위도
          lng: coord[0], // 경도
        })),
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      polyline.setMap(map);
    }
  }, [directions, map]);

  const handleMapClick = () => {
    setSelected(null);
  };

  return (
    <div>
      <Header map={map} center={center} />

      <ToCurrent onClick={() => map.panTo(center)}>
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
