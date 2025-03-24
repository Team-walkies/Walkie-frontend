import React, { useEffect, useState } from "react";
import styled from "styled-components";
import chevron from "../../assets/icons/ic_Chevron.png";
import { useRecoilValue } from "recoil";

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
  useRecoilValue;

  useEffect(() => {
    const checkGoogleLoaded = () => {
      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: center.lat, lng: center.lng };

        geocoder.geocode({ location: latlng }, (result, status) => {
          if (status == "OK") {
            console.log(
              //??시 ??구
              result[0].address_components[3].short_name +
                " " +
                result[0].address_components[2].short_name
            );
            setCurLocation(
              result[0].address_components[3].short_name +
                " " +
                result[0].address_components[2].short_name
            );
          } else {
            console.log(console.error("아직 로드안됨"));
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
  }, []);

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
      <h6>{curLocation}</h6>
    </Wrapper>
  );
};

export default Header;
