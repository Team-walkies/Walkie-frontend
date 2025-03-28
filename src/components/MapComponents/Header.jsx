import React, { useEffect, useState } from "react";
import styled from "styled-components";
import chevron from "../../assets/icons/ic_Chevron.png";
import { useRecoilValue } from "recoil";
import { locationState } from "../../utils/atoms";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  background-color: white;
  position: absolute;
  z-index: 20;
`;

const Header = ({ map, center }) => {
  const [curLocation, setCurLocation] = useState("");
  const locName = useRecoilValue(locationState);

  useEffect(() => {
    console.log("center:", center);
  }, []);

  useEffect(() => {
    const checkGoogleLoaded = () => {
      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: center.lat, lng: center.lng };
        geocoder.geocode({ location: latlng }, (result, status) => {
          if (status === "OK") {
            setCurLocation(
              result[0].address_components[3].short_name +
                " " +
                result[0].address_components[2].short_name
            );
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        });
      }
    };

    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(interval);
        checkGoogleLoaded();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [center]);

  return (
    <Wrapper>
      <img
        src={chevron}
        style={{
          position: "absolute",
          top: "10px",
          left: "16px",
          width: "24px",
          height: "24px",
        }}
      />
      <h6>{locName || curLocation}</h6>
    </Wrapper>
  );
};

export default Header;
