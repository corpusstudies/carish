import { makeStepFrame } from './draw.js';
import { enumerateList, enumerateValues } from './enumerate.js';
import { State, WindowSize, WindowSizeState } from './types.js'
import { makeWindowSizeState } from './window-size-state.js';

export function init() {
  const valueCount = 4;
  const columnCount = 5;
  const possibleValues = enumerateValues(valueCount);
  const arrayCombos = enumerateList(possibleValues, columnCount);
  console.log(arrayCombos);

  const scale = 50;
  const windowSize = {
    width: columnCount * scale,
    height: arrayCombos.length * scale
  };
  const canvas = createCanvas(windowSize);

  const context = canvas.getContext('2d');
  if (!context) {
    console.error('Unable to get 2D context for canvas');
    return;
  }

  context.scale(scale, scale);

  // const imageData = context.createImageData(columns, values.length);
  for (let valueIndex = 0; valueIndex < arrayCombos.length; valueIndex += 1) {
    const values = arrayCombos[valueIndex];
    for (let columnIndex = 0; columnIndex < values.length; columnIndex += 1) {
      const rowByteCount = values.length * 4;
      const pixelIndex = rowByteCount * valueIndex;
      let color;
      if (values[columnIndex] === 0) {
        context.fillStyle = 'black';
      } else if (values[columnIndex] === 1) {
        context.fillStyle = 'blue';
      } else if (values[columnIndex] === 2) {
        context.fillStyle = 'green';
      } else {
        context.fillStyle = 'red';
      }
      context.fillRect(columnIndex, valueIndex, 1, 1);
      // imageData.data[pixelIndex + 0] = color;
      // imageData.data[pixelIndex + 1] = color;
      // imageData.data[pixelIndex + 2] = color;
      // imageData.data[pixelIndex + 3] = 255;
    }
  }
  // context.putImageData(imageData, 0, 0);


  // let state: State =
  // {
  //   windowSizeState,
  //   context,
  //   canvas,
  //   previousTimeStamp: 0
  // }
  // window.requestAnimationFrame(makeStepFrame(state));
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
