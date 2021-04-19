export type Size = {
  height: number;
  width: number;
}

export type WindowSizeState = {
  getWindowSize: () => Size;
  resetToCurrentWindowSize: () => Size;
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

export type Content = {
  columnCount: number;
  arrayCombos: number[][];
};

export type State = {
  canvas: HTMLCanvasElement;
  content: Content;
  context: CanvasRenderingContext2D;
  imageData: ImageData;
  previousTimeStamp: number;
  scrollPosition: ScrollPosition;
  wheelState: WheelState;
  windowSizeState: WindowSizeState;
}
