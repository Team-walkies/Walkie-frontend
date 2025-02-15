import React from "react";
import { Route, Routes } from "react-router-dom";
import Map from "../pages/Map/Map";

const MapPages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
};

export default MapPages;
