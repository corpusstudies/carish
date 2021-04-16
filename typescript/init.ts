import { makeStepFrame } from './draw.js';
import { State, WindowSize, WindowSizeState } from './types.js'
import { makeWindowSizeState } from './window-size-state.js';

export function init() {
  const windowSizeState = makeWindowSizeState();
  const canvas = createCanvas(windowSizeState.getWindowSize());
  window.addEventListener('resize',
    makeWindowResizeHandler(windowSizeState, canvas));

  const context = canvas.getContext('2d');
  if (context) {
    let state: State =
    {
      windowSizeState,
      context,
      canvas,
      previousTimeStamp: 0
    }
    window.requestAnimationFrame(makeStepFrame(state));
  } else {
    console.error('Unable to get 2D context for canvas');
  }
}

function createCanvas(windowSize: WindowSize) {
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', windowSize.width.toString());
  canvas.setAttribute('height', windowSize.height.toString());
  canvas.setAttribute('style', 'display: block');
  document.body.appendChild(canvas);
  return canvas;
}

function makeWindowResizeHandler(
  windowSizeState: WindowSizeState,
  canvas: HTMLCanvasElement) {
  return () => {
    const windowSize = windowSizeState.resetToCurrentWindowSize();
    canvas.setAttribute('width', windowSize.width.toString());
    canvas.setAttribute('height', windowSize.height.toString());
  };
}
