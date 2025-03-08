import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MapPages from "./routes/MapPages";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useSetRecoilState } from "recoil";
import { geolocationState } from "./utils/atoms";
import "./App.css";
import { theme } from "./utils/theme";
import styled, { ThemeProvider } from "styled-components";
import Test from "./pages/Test";

function App() {
  const [count, setCount] = useState(0);
  const setGeolocation = useSetRecoilState(geolocationState);

  let apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    // 유저의 위치를 가져오는 함수
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setGeolocation({ latitude, longitude });
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
  }, [setGeolocation]);

  return (
    <>
      <APIProvider
        apiKey={apiKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/map/*" element={<MapPages />} />
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
