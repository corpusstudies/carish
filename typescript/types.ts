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
  consumeWheelEvents: () => Wheel;
  addWheelEvent: (wheel: Wheel) => void;
}

export type ScrollPosition = {
  xOffset: number;
  yOffset: number;
};

export type State = {
  windowSizeState: WindowSizeState;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  previousTimeStamp: number;
  wheelState: WheelState;
  scrollPosition: ScrollPosition;
}
