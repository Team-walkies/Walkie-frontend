// App.jsx
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MapPages from "./routes/MapPages";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useRecoilState, useSetRecoilState } from "recoil";
import { geolocationState, locationState } from "./utils/atoms";
import "./App.css";
import { theme } from "./utils/theme";
import styled, { ThemeProvider } from "styled-components";
import Test from "./pages/Test";
import Write from "./pages/Write";

function App() {
  const setGeolocation = useSetRecoilState(geolocationState);
  const [locName, setLocName] = useRecoilState(locationState);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  let apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    localStorage.setItem("accessToken", import.meta.env.VITE_TOKEN);

    // 위치 권한을 요청하는 함수
    const requestLocationPermission = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // 권한이 허용되면 위치를 저장
            setGeolocation({ latitude, longitude });
            setLocationPermissionGranted(true); // 위치 권한 허용 여부 상태 업데이트
          },
          (error) => {
            console.error("Geolocation Error: ", error);
            setLocationPermissionGranted(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // 위치 권한 요청
    requestLocationPermission();
  }, [setGeolocation]);

  return (
    <APIProvider
      apiKey={apiKey}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/map/*"
            element={
              locationPermissionGranted ? (
                <MapPages />
              ) : (
                <div>위치 권한을 허용해주세요.</div>
              )
            }
          />
          <Route path="/write" element={<Write />} />
        </Routes>
        <Routes>
          <Route path="/test" element={<Test />} />
        </Routes>
      </ThemeProvider>
    </APIProvider>
  );
}

export default App;
