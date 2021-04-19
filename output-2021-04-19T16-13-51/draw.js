var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export function makeStepFrame(state) {
    return function (timeStamp) {
        var windowSize = state.windowSizeState.getWindowSize();
        var context = state.context;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.fillStyle = 'black';
        context.fillRect(0, 0, windowSize.width, windowSize.height);
        var infoText = windowSize.width.toString() + '✕' + windowSize.height.toString();
        context.font = '30px Arial';
        var textMetrics = context.measureText(infoText);
        var textSize = {
            width: Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight),
            height: Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent)
        };
        var wheel = state.wheelState.consumeWheelEvents();
        var clamp = function (n, min, max) {
            return Math.max(Math.min(n, max), min);
        };
        var oldScrollPosition = state.scrollPosition;
        var _a = state.content, arrayCombos = _a.arrayCombos, columnCount = _a.columnCount;
        var contentSize = {
            width: columnCount,
            height: arrayCombos.length
        };
        var adjustedWindowSize = {
            width: windowSize.width,
            height: Math.max(0, windowSize.height - textSize.height)
        };
        var scrollPosition = {
            xOffset: clamp(oldScrollPosition.xOffset - wheel.deltaX, -(Math.abs(contentSize.width - 1) - 2), Math.abs(adjustedWindowSize.width - 1) - 2),
            yOffset: clamp(oldScrollPosition.yOffset - wheel.deltaY, -(Math.abs(contentSize.height) - 2), Math.abs(adjustedWindowSize.height) - 2)
        };
        context.putImageData(state.imageData, scrollPosition.xOffset, scrollPosition.yOffset);
        context.fillStyle = 'black';
        context.fillRect(0, 0, windowSize.width, textSize.height);
        context.fillStyle = 'white';
        context.fillText(infoText, 0, Math.abs(textMetrics.actualBoundingBoxAscent));
        var newState = __assign(__assign({}, state), { previousTimeStamp: timeStamp, scrollPosition: scrollPosition });
        window.requestAnimationFrame(makeStepFrame(newState));
    };
}
//# sourceMappingURL=draw.js.map