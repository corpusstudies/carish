import { makeStepFrame } from './draw.js';
import { enumerateList, enumerateValues } from './enumerate.js';
import { State, Size, WindowSizeState } from './types.js'
import { makeWheelState } from './wheel-state.js';
import { makeWindowSizeState } from './window-size-state.js';

export function init() {
  const valueCount = 4;
  const columnCount = 10;
  const possibleValues = enumerateValues(valueCount);
  const arrayCombos = enumerateList(possibleValues, columnCount);
  console.log({valueCount: arrayCombos.length});

  const windowSizeState = makeWindowSizeState();
  const canvas = makeCanvas(windowSizeState.getWindowSize());

  const context = canvas.getContext('2d');
  if (!context) {
    console.error('Unable to get 2D context for canvas');
    return;
  }

  const imageData = context.createImageData(columnCount, arrayCombos.length);
  const imageArray = imageData.data;
  for (let valueIndex = 0; valueIndex < arrayCombos.length; valueIndex += 1) {
    const values = arrayCombos[valueIndex];
    for (let columnIndex = 0; columnIndex < values.length; columnIndex += 1) {
      const rowByteCount = columnCount * 4;
      const rowByteStart = rowByteCount * valueIndex;
      const pixelIndex = rowByteStart + (columnIndex * 4);
      let red = 0;
      let green = 0;
      let blue = 0;
      if (values[columnIndex] === 0) {
        // black
      } else if (values[columnIndex] === 1) {
        blue = 255;
      } else if (values[columnIndex] === 2) {
        green = 255;
      } else {
        red = 255;
      }
      imageArray[pixelIndex + 0] = red;
      imageArray[pixelIndex + 1] = green;
      imageArray[pixelIndex + 2] = blue;
      imageArray[pixelIndex + 3] = 255;
    }
  }

  const wheelState = makeWheelState();
  let state: State =
  {
    canvas,
    content: { arrayCombos, columnCount },
    context,
    imageData,
    previousTimeStamp: 0,
    scrollPosition: {
      xOffset: 0,
      yOffset: 0
    },
    wheelState,
    windowSizeState,
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
