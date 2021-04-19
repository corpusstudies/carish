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
        var fpsText = '';
        var millisecondsPassed = timeStamp - state.previousTimeStamp;
        var context = state.context;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.fillStyle = 'black';
        context.fillRect(0, 0, windowSize.width, windowSize.height);
        var fps = Math.round(1000 / millisecondsPassed);
        if (fps < 0 || isNaN(fps)) {
            fps = 0;
        }
        if (fps > 1000) {
            fps = 1000;
        }
        var wheel = state.wheelState.consumeWheelEvents();
        fpsText
            = wheel.deltaX.toString()
                + ' x '
                + wheel.deltaY.toString();
        var clamp = function (n, min, max) {
            return Math.max(Math.min(n, max), min);
        };
        var oldScrollPosition = state.scrollPosition;
        var _a = state.content, arrayCombos = _a.arrayCombos, columnCount = _a.columnCount;
        var contentSize = {
            width: columnCount,
            height: arrayCombos.length
        };
        var scrollPosition = {
            xOffset: clamp(oldScrollPosition.xOffset - wheel.deltaX, -(Math.abs(contentSize.width - 1) - 2), Math.abs(windowSize.width - 1) - 2),
            yOffset: clamp(oldScrollPosition.yOffset - wheel.deltaY, -(Math.abs(contentSize.height) - 2), Math.abs(windowSize.height) - 2)
        };
        context.putImageData(state.imageData, scrollPosition.xOffset, scrollPosition.yOffset);
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
        var newState = __assign(__assign({}, state), { previousTimeStamp: timeStamp, scrollPosition: scrollPosition });
        window.requestAnimationFrame(makeStepFrame(newState));
    };
}
//# sourceMappingURL=draw.js.map