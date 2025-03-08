import React from "react";
import { useRecoilValue } from "recoil";
import { geolocationState } from "../utils/atoms";

const Test = () => {
  const { latitude, longitude } = useRecoilValue(geolocationState);

  // 로딩 상태 처리
  if (latitude === 0 && longitude === 0) {
    return <div>Location is loading...</div>;
  }

  return (
    <div>
      <h1>Your Location</h1>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
};

export default Test;
