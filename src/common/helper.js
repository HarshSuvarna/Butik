import { googleMapsLink } from "../common/constants";

export const showDirection = (latitude, longitude) => {
  console.log("latitude :>> ", latitude);

  let directionLink = googleMapsLink.replace("{}", latitude + "," + longitude);
  window.open(directionLink, "_blank", "noreferrer");
};
