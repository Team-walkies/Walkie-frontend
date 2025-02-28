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
import PoiMarker from "./PoiMarker";

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
  height: 100vh; /* 화면 전체 높이 */
`;

const WalkMaps = ({ destination }) => {
  const [center, setCenter] = useState({ lat: 37.6766464, lng: 126.7695616 });
  const [heading, setHeading] = useState(0); // 🔄 핸드폰 방향
  const [selected, setSelected] = useState(null); // selected to hold null initially
  const [directions, setDirections] = useState(null); // 경로 저장 상태
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false); // State to track Google Maps API loading

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
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      // DirectionsRenderer를 map에 연결
      if (map && !directionsRenderer.getMap()) {
        directionsRenderer.setMap(map);
      }

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
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
    }
  }, [isGoogleLoaded, map]);

  useEffect(() => {
    if (center && destination && isGoogleLoaded) {
      const directionsService = new google.maps.DirectionsService();

      const request = {
        origin: center,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
      };

      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(response);
        } else {
          console.error("Directions request failed due to " + status);
          if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
            console.error("경로를 찾을 수 없습니다. 출발지와 도착지 확인 필요");
          }
          if (response.error_message) {
            console.error("API 오류 메시지:", response.error_message);
          }
        }
      });
    }
  }, [center, destination, isGoogleLoaded]);

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
          <PoiMarker
            isDestination={true}
            location={destination}
            clickFn={setSelected}
            map={map}
            selectedPoiKey={selected ? selected.key : null}
          />
          {/* DirectionsRenderer를 사용하여 경로 표시 */}
          {directions && (
            <google.maps.DirectionsRenderer directions={directions} />
          )}
        </Map>
      </MapContainer>
    </div>
  );
};

export default WalkMaps;
