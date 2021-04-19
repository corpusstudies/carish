import { State, Size } from './types.js'

export function makeStepFrame(state: State) {
  return (timeStamp: number) => {
    let windowSize = state.windowSizeState.getWindowSize();
    const context = state.context;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = 'black';
    context.fillRect(0, 0, windowSize.width, windowSize.height);

    const infoText = windowSize.width.toString() + '✕' + windowSize.height.toString();
    context.font = '30px Arial';
    const textMetrics = context.measureText(infoText);
    const textSize = {
      width: Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight),
      height: Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent)
    }

    const wheel = state.wheelState.consumeWheelEvents();
    const clamp = (n: number, min: number, max: number) =>
      Math.max(Math.min(n, max), min);
    const oldScrollPosition = state.scrollPosition;

    const { arrayCombos, columnCount } = state.content;
    const contentSize = {
      width: columnCount,
      height: arrayCombos.length
    };

    const adjustedWindowSize = {
      width: windowSize.width,
      height: Math.max(0, windowSize.height - textSize.height)
    }
    const scrollPosition = {
      xOffset:
        clamp(
          oldScrollPosition.xOffset - wheel.deltaX,
          -(Math.abs(contentSize.width - 1) - 2),
          Math.abs(adjustedWindowSize.width - 1) - 2,
        ),
      yOffset:
        clamp(
          oldScrollPosition.yOffset - wheel.deltaY,
          -(Math.abs(contentSize.height) - 2),
          Math.abs(adjustedWindowSize.height) - 2
        )
    };
    context.putImageData(state.imageData,
      scrollPosition.xOffset,
      scrollPosition.yOffset);

    context.fillStyle = 'black';
    context.fillRect(0, 0, windowSize.width, textSize.height);
    context.fillStyle = 'white';
    context.fillText(infoText, 0, Math.abs(textMetrics.actualBoundingBoxAscent));

    const newState = {
      ...state,
      previousTimeStamp: timeStamp,
      scrollPosition
    }
    window.requestAnimationFrame(makeStepFrame(newState));
  }
}
