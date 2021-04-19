export function makeWindowSizeState() {
    var windowSize = {
        height: window.innerHeight,
        width: window.innerWidth
    };
    var getWindowSize = function () { return windowSize; };
    var resetToCurrentWindowSize = function () {
        windowSize = {
            height: window.innerHeight,
            width: window.innerWidth
        };
        return windowSize;
    };
    return { getWindowSize: getWindowSize, resetToCurrentWindowSize: resetToCurrentWindowSize };
}
//# sourceMappingURL=window-size-state.js.map