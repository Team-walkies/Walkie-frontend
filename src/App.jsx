import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MapPages from "./routes/MapPages";
import "./App.css";
import { theme } from "./utils/theme";
import styled, { ThemeProvider } from "styled-components";
import { APIProvider } from "@vis.gl/react-google-maps";

// const Heading = styled.h1`
//   font-size: ${(props) => props.theme.fontSizes.h1};
//   line-height: ${(props) => props.theme.lineHeights.h1};
//   font-weight: ${(props) => props.theme.fontWeights.extraBold};
//   color: ${(props) => props.theme.colors.gray900};
// `;

// const Paragraph = styled.p`
//   font-size: ${(props) => props.theme.fontSizes.b1};
//   line-height: ${(props) => props.theme.lineHeights.b1};
//   font-weight: ${(props) => props.theme.fontWeights.medium};
//   color: ${(props) => props.theme.colors.gray700};
// `;

function App() {
  const [count, setCount] = useState(0);
  let apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <APIProvider
        apiKey={apiKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <ThemeProvider theme={theme}>
          <div>hello</div>
          <Routes>
            <Route path="/map/*" element={<MapPages />} />
          </Routes>
        </ThemeProvider>
      </APIProvider>
    </>
  );
}

export default App;
