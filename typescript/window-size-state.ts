import { WindowSize, WindowSizeState } from "./types";

export function makeWindowSizeState(): WindowSizeState {
  let windowSize: WindowSize = {
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
