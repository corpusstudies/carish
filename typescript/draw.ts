import { State, WindowSize } from './types.js'

export function makeStepFrame(state: State) {
  return (timeStamp: number) => {
    let windowSize = state.windowSizeState.getWindowSize();
    let fpsText = '';
    let millisecondsPassed = timeStamp - state.previousTimeStamp;
    const context = state.context;

    context.fillStyle = 'black';
    context.fillRect(0, 0, windowSize.width, windowSize.height);

    let fps = Math.round(1000 / millisecondsPassed);
    if (fps < 0 || isNaN(fps)) {
      fps = 0;
    }
    if (fps > 1000) {
      fps = 1000;
    }

    const wheel = state.wheelState.getWheel();
    fpsText
      = wheel.deltaX.toString()
      + ' x '
      + wheel.deltaY.toString();
/*
    fpsText = 'FPS: ' + fps
      // + ' ' + windowSize.width + 'x' + windowSize.height;
      + ' Βίβλος γενέσεως Ἰησοῦ '
      + 'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים';
*/

    context.font = '30px SBL Hebrew';
    context.fillStyle = 'black';
    let textMetrics = context.measureText(fpsText);
    context.fillStyle = '#ddffdd';
    context.fillRect(
      0, 0,
      Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight),
      Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent));

    context.fillStyle = 'black';
    context.fillText(fpsText, 0, Math.abs(textMetrics.actualBoundingBoxAscent));

    window.requestAnimationFrame(makeStepFrame({...state, previousTimeStamp: timeStamp}));
  }
}
