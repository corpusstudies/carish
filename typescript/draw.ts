import { State, Size } from './types.js'

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

    const { arrayCombos, columnCount } = state.content;
    const scale = {
      width: 20,
      height: 20
    };
    const contentSize = {
      width: columnCount * scale.width,
      height: arrayCombos.length * scale.height
    };

    const scrollPosition = {
      xOffset:
        clamp(
          oldScrollPosition.xOffset - wheel.deltaX,
          -(Math.abs(contentSize.width - 1) - 2),
          Math.abs(windowSize.width - 1) - 2,
        ),
      yOffset:
        clamp(
          oldScrollPosition.yOffset - wheel.deltaY,
          -(Math.abs(contentSize.height) - 2),
          Math.abs(windowSize.height) - 2
        )
    };
    context.setTransform(1, 0, 0, 1,
      scrollPosition.xOffset,
      scrollPosition.yOffset);

    context.scale(scale.width, scale.height);
  
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
      }
    }

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
