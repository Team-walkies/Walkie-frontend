import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MapPages from "./routes/MapPages";
import "./App.css";
import { theme } from "./utils/theme";
import styled, { ThemeProvider } from "styled-components";

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <div>hello</div>
        <Routes>
          <Route path="/" element={<MapPages />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
