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

  let apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    localStorage.setItem("accessToken", import.meta.env.VITE_TOKEN);
    // 유저의 위치를 가져오는 함수
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setGeolocation({ latitude, longitude });

            const checkGoogleLoaded = () => {
              if (window.google && window.google.maps) {
                const geocoder = new window.google.maps.Geocoder();
                const latlng = { lat: latitude, lng: longitude };

                geocoder.geocode({ location: latlng }, (result, status) => {
                  if (status === "OK") {
                    // Reverse geocode the coordinates and set location state
                    const location =
                      result[0].address_components[3].short_name +
                      " " +
                      result[0].address_components[2].short_name;

                    setLocName(location);
                  } else {
                    console.error("Geocoder failed due to: " + status);
                  }
                });
              }
            };

            // Poll for Google Maps API to load
            const interval = setInterval(() => {
              if (window.google && window.google.maps) {
                clearInterval(interval);
                checkGoogleLoaded();
              }
            }, 200);
          },
          (error) => {
            console.error("Geolocation Error: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation();
  }, [setGeolocation, setLocName]);

  return (
    <>
      <APIProvider
        apiKey={apiKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/map/*" element={<MapPages />} />
            <Route path="/write" element={<Write />} />
          </Routes>
          <Routes>
            <Route path="/test" element={<Test />} />
          </Routes>
        </ThemeProvider>
      </APIProvider>
    </>
  );
}

export default App;
