import React from "react";
import { Route, Routes } from "react-router-dom";
import Map from "../pages/Map/Map";
import Header from "../components/MapComponents/Header";
import Walk from "../pages/Map/Walk";

const MapPages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/walk" element={<Walk />} />
      </Routes>
    </div>
  );
};

export default MapPages;
