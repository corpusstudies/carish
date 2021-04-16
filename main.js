"use strict";
let canvas;
let context;
let oldTimeStamp;
let firstRender = true;
let windowSize;

window.onload = init;
window.addEventListener('resize', handleWindowResize);

function init() {
  setWindowSize();
  createCanvas();
  context = canvas.getContext('2d');

  window.requestAnimationFrame(stepFrame);
}

function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas');
  canvas.setAttribute('width', windowSize.width);
  canvas.setAttribute('height', windowSize.height);
  canvas.setAttribute('style', 'display: block');
  document.body.appendChild(canvas);
}

function handleWindowResize() {
  setWindowSize();
  canvas.setAttribute('width', windowSize.width);
  canvas.setAttribute('height', windowSize.height);
}

function setWindowSize() {
  windowSize = { height: window.innerHeight, width: window.innerWidth };
  console.log(windowSize);
}

function stepFrame(timeStamp) {
  let fpsText = '';

  let millisecondsPassed = timeStamp - oldTimeStamp;
  oldTimeStamp = timeStamp;

  context.fillStyle = 'white';
  context.fillRect(0, 0, 1000, 800);

  let fps = Math.round(1000 / millisecondsPassed);

  fpsText = 'FPS: ' + fps
    + ' Βίβλος γενέσεως Ἰησοῦ '
    + 'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים';

  let textMetrics = context.measureText(fpsText);
  context.fillStyle = '#ddffdd';
  context.fillRect(
    0, 0,
    Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight),
    Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent));
  if (firstRender) {
    console.log(textMetrics);
    firstRender = false;
  }

  context.font = '30px SBL Hebrew';
  context.fillStyle = 'black';
  context.fillText(fpsText, 0, textMetrics.actualBoundingBoxAscent);

  window.requestAnimationFrame(stepFrame);
}
