import React from "react";
import { useLocation } from "react-router-dom";

const Walk = () => {
  const location = useLocation(); // To get the location data passed through navigation
  const { loc } = location.state || {}; // Extract loc from state

  return (
    <div>
      <h3>Walk Page</h3>
      {loc ? (
        <div>
          <h4>Selected Location:</h4>
          <p>Latitude: {loc.lat}</p>
          <p>Longitude: {loc.lng}</p>
        </div>
      ) : (
        <p>No location data available</p>
      )}
    </div>
  );
};

export default Walk;
