import React, { useState, useEffect } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import styled from "styled-components";
import myloc from "../../assets/icons/toMyloc.png";
import UserMarker from "./UserMarker";
import PoiMarker from "./PoiMarker";
import Header from "./Header";
import { useRecoilState } from "recoil";
import { geolocationState } from "../../utils/atoms";
import { useLocation, useNavigate } from "react-router-dom";

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
const SnackBarWrap = styled.div`
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SnackBarBg = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 16px;
  width: 100%;
  height: 56px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
`;

const SnackContent = styled.div`
  position: absolute;
  width: calc(100% - 40px);
  color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SnackBtn = styled.button`
  background-color: ${(props) =>
    props.insideCircle ? "var(--blue-300)" : "var(--gray-900)"};
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  margin-left: 16px;
`;

const WalkMaps = ({ destination }) => {
  const tmapApiKey = import.meta.env.VITE_TMAP_API_KEY;
  const [center, setCenter] = useRecoilState(geolocationState);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  const [destination2, setDestination] = useState({ lat: lat, lng: lng });

  // const [center, setCenter] = useState({ lat: 37.6766464, lng: 126.7695616 });
  const [heading, setHeading] = useState(0);
  const [directions, setDirections] = useState(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [selected, setSelected] = useState("");
  const [route, setRoute] = useState([]);
  const [snackText, setSnackText] = useState("와 이동을 시작해요!");
  const [insideCircle, setInsideCircle] = useState(false);
  const [btnText, setBtnText] = useState("중단하기");

  const map = useMap();

  //구글맵 로드
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

  //스낵바 문구
  useEffect(() => {
    const interval = setInterval(() => {
      setSnackText("와 함께 걷는 중...");
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(center);
  }, []);

  //유저 위치 감지
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

  //경로 검색
  useEffect(() => {
    if (center && destination) {
      const fetchTmapPedestrianRoute = async () => {
        const startX = center.lng;
        const startY = center.lat;
        const endX = destination2.lng;
        const endY = destination2.lat;

        const apiUrl = `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1`;
        console.log("start:", startX, startY);
        console.log("end:", endX, endY);
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
  }, [destination]);

  //경로 그리기
  useEffect(() => {
    // console.log("route", route);
    if (route.length > 0 && map) {
      // 경로를 Polyline으로 지도에 추가
      route.forEach((coordinates) => {
        const path = coordinates.map(([lng, lat]) => ({ lat, lng }));
        const polyline = new window.google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#70cfff",
          strokeOpacity: 1.0,
          strokeWeight: 5,
        });

        polyline.setMap(map); // 경로를 지도에 추가
      });
    }
  }, [route, map]);

  //거리 계산
  useEffect(() => {
    const interval = setInterval(() => {
      if (center && destination) {
        // 구글 Maps API의 computeDistanceBetween를 사용
        const centerLatLng = new window.google.maps.LatLng(
          center.lat,
          center.lng
        );
        const destinationLatLng = new window.google.maps.LatLng(
          destination.lat,
          destination.lng
        );
        const distance =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            centerLatLng,
            destinationLatLng
          );

        // 100m 이내일 경우
        if (distance <= 100) {
          setInsideCircle(true);
          setBtnText("알 획득하기");
        } else {
          setInsideCircle(false);
          setBtnText("중단하기");
        }
      }
    }, 2000); // 5초마다 실행

    return () => clearInterval(interval); // cleanup
  }, [center, destination]);

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
        {isGoogleLoaded && center ? (
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
            <PoiMarker isDestination={true} location={destination} map={map} />
          </Map>
        ) : null}
      </MapContainer>
      <SnackBarWrap>
        <SnackBarBg></SnackBarBg>
        <SnackContent>
          <div style={{ display: "flex" }}>
            <h6 className="b2" style={{ fontWeight: "700" }}>
              태초의 해파리
            </h6>
            <span className="b2">{snackText}</span>
          </div>
          {snackText == "와 함께 걷는 중..." && (
            <SnackBtn
              onClick={() => {
                if (insideCircle) {
                  navigate("/write");
                }
              }}
              insideCircle={insideCircle}
            >
              {btnText}
            </SnackBtn>
          )}
        </SnackContent>
      </SnackBarWrap>
    </div>
  );
};

export default WalkMaps;
