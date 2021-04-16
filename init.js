import { makeStepFrame } from './draw.js';

let windowSize = { height: 0, width: 0 };

export function init() {
  setWindowSize();
  const canvas = createCanvas();
  window.addEventListener('resize', makeWindowResizeHandler(canvas));
  window.requestAnimationFrame(makeStepFrame(windowSize, canvas, 0));
}

function createCanvas() {
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', windowSize.width);
  canvas.setAttribute('height', windowSize.height);
  canvas.setAttribute('style', 'display: block');
  document.body.appendChild(canvas);
  return canvas;
}

function makeWindowResizeHandler(canvas) {
  return () => {
    setWindowSize();
    canvas.setAttribute('width', windowSize.width);
    canvas.setAttribute('height', windowSize.height);
  };
}

function setWindowSize() {
  windowSize = { height: window.innerHeight, width: window.innerWidth };
}
