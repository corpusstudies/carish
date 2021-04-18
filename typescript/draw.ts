import { State, WindowSize } from './types.js'

export function makeStepFrame(state: State) {
  return (timeStamp: number) => {
    let windowSize = state.windowSizeState.getWindowSize();
    let fpsText = '';
    let millisecondsPassed = timeStamp - state.previousTimeStamp;
    const context = state.context;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = 'black';
    context.fillRect(0, 0, windowSize.width, windowSize.height);

    let fps = Math.round(1000 / millisecondsPassed);
    if (fps < 0 || isNaN(fps)) {
      fps = 0;
    }
    if (fps > 1000) {
      fps = 1000;
    }

    const wheel = state.wheelState.consumeWheelEvents();
    fpsText
      = wheel.deltaX.toString()
      + ' x '
      + wheel.deltaY.toString();

    const clamp = (n: number, min: number, max: number) =>
      Math.max(Math.min(n, max), min);
    const oldScrollPosition = state.scrollPosition;
    const objectSize = {
      width: 500,
      height: 500
    }
    const scrollPosition = {
      xOffset:
        clamp(
          oldScrollPosition.xOffset - wheel.deltaX,
          -(Math.abs(objectSize.width - 1) - 2),
          Math.abs(windowSize.width - 1) - 2,
        ),
      yOffset:
        clamp(
          oldScrollPosition.yOffset - wheel.deltaY,
          -(Math.abs(objectSize.height) - 2),
          Math.abs(windowSize.height) - 2
        )
    };
    context.setTransform(1, 0, 0, 1,
      scrollPosition.xOffset,
      scrollPosition.yOffset);
    context.fillStyle = '#ff6666';
    context.fillRect(0, 0, objectSize.width, objectSize.height);

    /*
        fpsText = 'FPS: ' + fps
          // + ' ' + windowSize.width + 'x' + windowSize.height;
          + ' Βίβλος γενέσεως Ἰησοῦ '
          + 'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים';
    */
    /*
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
    */
    const newState = {
      ...state,
      previousTimeStamp: timeStamp,
      scrollPosition
    }
    window.requestAnimationFrame(makeStepFrame(newState));
  }
}
