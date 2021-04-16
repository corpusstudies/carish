import { makeStepFrame } from './draw.js';
import { WindowSize } from './types.js'

let windowSize: WindowSize = { height: 0, width: 0 };

export function init() {
  setWindowSize();
  const canvas = createCanvas();
  window.addEventListener('resize', makeWindowResizeHandler(canvas));

  const context = canvas.getContext('2d');
  if (context) {
    window.requestAnimationFrame(makeStepFrame(() => windowSize, context, 0));
  }
}

function createCanvas() {
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', windowSize.width.toString());
  canvas.setAttribute('height', windowSize.height.toString());
  canvas.setAttribute('style', 'display: block');
  document.body.appendChild(canvas);
  return canvas;
}

function makeWindowResizeHandler(canvas: HTMLCanvasElement) {
  return () => {
    setWindowSize();
    canvas.setAttribute('width', windowSize.width.toString());
    canvas.setAttribute('height', windowSize.height.toString());
  };
}

function setWindowSize() {
  windowSize = { height: window.innerHeight, width: window.innerWidth };
}
