import { Wheel } from "./types";

export function makeWheelState() {
  let wheelState: Wheel = {
    deltaX: 0,
    deltaY: 0
  };
  return {
    getWheel: () => wheelState,
    setWheel: (wheel: Wheel) => {
      wheelState = wheel;
    }
  }
}