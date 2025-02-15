import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MapPages from "./routes/MapPages";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>hello</div>
      <Routes>
        <Route path="/" element={<MapPages />} />
      </Routes>
    </>
  );
}

export default App;
