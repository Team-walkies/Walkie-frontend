export const metersToKms = (meters) => {
  if (meters < 1000) {
    return meters + "m";
  } else {
    return meters / 1000 + "km";
  }
};
