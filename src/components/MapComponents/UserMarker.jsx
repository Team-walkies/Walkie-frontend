import { AdvancedMarker, Marker } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

const UserMarker = ({ center, heading }) => {
  const latLng = new window.google.maps.LatLng(center.lat, center.lng);

  return (
    <>
      <Marker
        position={latLng}
        clickable={true}
        icon={{
          url: "/assets/myPosition.png",
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
        }}
      />

      {/*  바라보는 방향  */}
      <AdvancedMarker position={center}>
        <div
          style={{
            width: "0px",
            height: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `rotate(${heading}deg)`,
          }}
        >
          <img
            src="/assets/dir.png"
            alt="direction"
            style={{
              width: "17px",
              height: "15px",
              position: "relative",
              top: "-20px",
            }}
          />
        </div>
      </AdvancedMarker>
    </>
  );
};

export default UserMarker;
