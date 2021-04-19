export function makeWindowSizeState() {
    var windowSizeState = { height: 0, width: 0 };
    var getWindowSize = function () { return windowSizeState; };
    var setWindowSize = function (windowSize) {
        windowSizeState = windowSize;
    };
    return { getWindowSize: getWindowSize, setWindowSize: setWindowSize };
}
//# sourceMappingURL=window-resize-event.js.map