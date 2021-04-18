import { makeStepFrame } from './draw.js';
import { enumerateList, enumerateValues } from './enumerate.js';
import { State, Size, WindowSizeState } from './types.js'
import { makeWheelState } from './wheel-state.js';
import { makeWindowSizeState } from './window-size-state.js';

export function init() {
  const valueCount = 2;
  const columnCount = 8;
  const possibleValues = enumerateValues(valueCount);
  const arrayCombos = enumerateList(possibleValues, columnCount);
  console.log(arrayCombos);

  const windowSizeState = makeWindowSizeState();
  const canvas = makeCanvas(windowSizeState.getWindowSize());

  const context = canvas.getContext('2d');
  if (!context) {
    console.error('Unable to get 2D context for canvas');
    return;
  }

  const wheelState = makeWheelState();
  let state: State =
  {
    windowSizeState,
    context,
    canvas,
    previousTimeStamp: 0,
    wheelState,
    scrollPosition: {
      xOffset: 0,
      yOffset: 0
    },
    content: { arrayCombos, columnCount }
  };

  window.addEventListener('resize',
    makeWindowResizeHandler(windowSizeState, canvas));

  canvas.addEventListener('wheel', (event) => {
    event.preventDefault();

    const { deltaX, deltaY, deltaMode } = event;
    state.wheelState.addWheelEvent({ deltaX, deltaY });
  });

  window.requestAnimationFrame(makeStepFrame(state));
}

function makeCanvas(windowSize: Size) {
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
