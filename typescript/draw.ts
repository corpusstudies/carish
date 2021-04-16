import { WindowSize } from './types.js'

export function makeStepFrame(
  getWindowSize: () => WindowSize,
  context: CanvasRenderingContext2D,
  oldTimeStamp: number
) {
  return (timeStamp: number) => {
    let windowSize = getWindowSize();
    let fpsText = '';
    let millisecondsPassed = timeStamp - oldTimeStamp;

    context.fillStyle = 'black';
    context.fillRect(0, 0, windowSize.width, windowSize.height);

    let fps = Math.round(1000 / millisecondsPassed);
    if (fps < 0 || isNaN(fps)) {
      fps = 0;
    }
    if (fps > 1000) {
      fps = 1000;
    }

    fpsText = 'FPS: ' + fps
      + ' ' + windowSize.width + 'x' + windowSize.height;
    // + ' Βίβλος γενέσεως Ἰησοῦ '
    // + 'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים';

    context.font = '30px SBL Hebrew';
    context.fillStyle = 'black';
    let textMetrics = context.measureText(fpsText);
    context.fillStyle = '#ddffdd';
    context.fillRect(
      0, 0,
      Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight),
      Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent));

    context.font = '30px SBL Hebrew';
    context.fillStyle = 'black';
    context.fillText(fpsText, 0, Math.abs(textMetrics.actualBoundingBoxAscent));

    window.requestAnimationFrame(makeStepFrame(getWindowSize, context, timeStamp));
  }
}
