import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/MapComponents/Header";
import WalkMaps from "../../components/MapComponents/WalkMaps";

const Walk = () => {
  // const location = useLocation(); // To get the location data passed through navigation
  // const { loc } = location.state || { lat: 37.675418, lng: 126.769645 }; // Extract loc from state

  // useEffect(() => {
  //   console.clear();
  //   console.log("loc", loc);
  // }, []);
  return (
    <div>
      <WalkMaps />
    </div>
  );
};

export default Walk;
