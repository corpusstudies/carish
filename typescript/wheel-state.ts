import { Wheel } from "./types";

export function makeWheelState() {
  let wheelEvents: Wheel[] = [];
  return {
    consumeWheelEvents: () => {
      const result = combineWheelEvents(wheelEvents);
      wheelEvents = [];
      return result;
    },
    addWheelEvent: (wheel: Wheel) => {
      wheelEvents.push(wheel);
    }
  }
}

export function combineWheelEvents(wheelEvents: Wheel[]) {
  const combine = (previousValue: Wheel, currentValue: Wheel) => ({
    deltaX: previousValue.deltaX - currentValue.deltaX,
    deltaY: previousValue.deltaY - currentValue.deltaY
  })
  const initialValue = {
    deltaX: 0,
    deltaY: 0
  };
  return wheelEvents.reduce(combine, initialValue);
}
