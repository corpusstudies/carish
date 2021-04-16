export type WindowSize = {
  height: number;
  width: number;
}

export type State = {
  getWindowSize: () => WindowSize;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  previousTimeStamp: number;
}
