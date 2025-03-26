export const metersToKms = (meters) => {
  if (meters < 1000) {
    return meters + "m";
  } else {
    return meters / 1000 + "km";
  }
};

export const calcFootSteps = (meters) => {
  return (meters / 0.75).toFixed(0);
};
