import React, { useEffect, useState } from "react";

const Header = ({ map, center }) => {
  const [curLocation, setCurLocation] = useState("");

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

  return <div>{curLocation}</div>;
};

export default Header;
