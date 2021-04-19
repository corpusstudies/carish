import { makeStepFrame } from './draw.js';
import { enumerateList, enumerateValues } from './enumerate.js';
import { makeWheelState } from './wheel-state.js';
import { makeWindowSizeState } from './window-size-state.js';
export function init() {
    var valueCount = 4;
    var columnCount = 10;
    var possibleValues = enumerateValues(valueCount);
    var arrayCombos = enumerateList(possibleValues, columnCount);
    console.log({ valueCount: arrayCombos.length });
    var windowSizeState = makeWindowSizeState();
    var canvas = makeCanvas(windowSizeState.getWindowSize());
    var context = canvas.getContext('2d');
    if (!context) {
        console.error('Unable to get 2D context for canvas');
        return;
    }
    var imageData = context.createImageData(columnCount, arrayCombos.length);
    var imageArray = imageData.data;
    for (var valueIndex = 0; valueIndex < arrayCombos.length; valueIndex += 1) {
        var values = arrayCombos[valueIndex];
        for (var columnIndex = 0; columnIndex < values.length; columnIndex += 1) {
            var rowByteCount = columnCount * 4;
            var rowByteStart = rowByteCount * valueIndex;
            var pixelIndex = rowByteStart + (columnIndex * 4);
            var red = 0;
            var green = 0;
            var blue = 0;
            if (values[columnIndex] === 0) {
                // black
            }
            else if (values[columnIndex] === 1) {
                blue = 255;
            }
            else if (values[columnIndex] === 2) {
                green = 255;
            }
            else {
                red = 255;
            }
            imageArray[pixelIndex + 0] = red;
            imageArray[pixelIndex + 1] = green;
            imageArray[pixelIndex + 2] = blue;
            imageArray[pixelIndex + 3] = 255;
        }
    }
    var wheelState = makeWheelState();
    var state = {
        canvas: canvas,
        content: { arrayCombos: arrayCombos, columnCount: columnCount },
        context: context,
        imageData: imageData,
        previousTimeStamp: 0,
        scrollPosition: {
            xOffset: 0,
            yOffset: 0
        },
        wheelState: wheelState,
        windowSizeState: windowSizeState
    };
    window.addEventListener('resize', makeWindowResizeHandler(windowSizeState, canvas));
    canvas.addEventListener('wheel', function (event) {
        event.preventDefault();
        var deltaX = event.deltaX, deltaY = event.deltaY, deltaMode = event.deltaMode;
        state.wheelState.addWheelEvent({ deltaX: deltaX, deltaY: deltaY });
    });
    window.requestAnimationFrame(makeStepFrame(state));
}
function makeCanvas(windowSize) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', windowSize.width.toString());
    canvas.setAttribute('height', windowSize.height.toString());
    canvas.setAttribute('style', 'display: block');
    document.body.appendChild(canvas);
    return canvas;
}
function makeWindowResizeHandler(windowSizeState, canvas) {
    return function () {
        var windowSize = windowSizeState.resetToCurrentWindowSize();
        canvas.setAttribute('width', windowSize.width.toString());
        canvas.setAttribute('height', windowSize.height.toString());
    };
}
//# sourceMappingURL=init.js.map