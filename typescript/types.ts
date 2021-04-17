export type WindowSize = {
  height: number;
  width: number;
}

export type WindowSizeState = {
  getWindowSize: () => WindowSize;
  resetToCurrentWindowSize: () => WindowSize;
}

export type Wheel = {
  deltaX: number;
  deltaY: number;
};

export type WheelState = {
  getWheel: () => Wheel;
  setWheel: (wheel: Wheel) => void;
}

export type State = {
  windowSizeState: WindowSizeState;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  previousTimeStamp: number;
  wheelState: WheelState;
}
