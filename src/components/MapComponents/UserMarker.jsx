import { AdvancedMarker, Marker, Pin } from "@vis.gl/react-google-maps";

const UserMarker = ({ center, heading }) => (
  <Marker
    position={center}
    clickable={true}
    icon={{
      url: "/assets/myPosition.png",
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: new window.google.maps.Point(20, 20),
    }}
  />
);

export default UserMarker;
