export type WindowSize = {
  height: number;
  width: number;
}

export type WindowSizeState = {
  getWindowSize: () => WindowSize;
  resetToCurrentWindowSize: () => WindowSize;
}

export type State = {
  windowSizeState: WindowSizeState;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  previousTimeStamp: number;
}