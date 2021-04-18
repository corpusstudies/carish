import { Size, WindowSizeState } from "./types";

export function makeWindowSizeState(): WindowSizeState {
  let windowSize: Size = {
    height: window.innerHeight,
    width: window.innerWidth
  };
  const getWindowSize = () => windowSize;
  const resetToCurrentWindowSize = () => {
    windowSize = {
      height: window.innerHeight,
      width: window.innerWidth
    };
    return windowSize;
  }
  return { getWindowSize, resetToCurrentWindowSize };
}
