import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/MapComponents/Header";
import WalkMaps from "../../components/MapComponents/WalkMaps";

const Walk = () => {
  const location = useLocation(); // To get the location data passed through navigation
  const { loc } = location.state || {}; // Extract loc from state

  return (
    <div>
      <WalkMaps destination={loc} />
    </div>
  );
};

export default Walk;
