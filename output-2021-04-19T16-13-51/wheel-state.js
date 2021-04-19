export function makeWheelState() {
    var wheelEvents = [];
    return {
        consumeWheelEvents: function () {
            var result = combineWheelEvents(wheelEvents);
            wheelEvents = [];
            return result;
        },
        addWheelEvent: function (wheel) {
            wheelEvents.push(wheel);
        }
    };
}
export function combineWheelEvents(wheelEvents) {
    var combine = function (previousValue, currentValue) { return ({
        deltaX: previousValue.deltaX + currentValue.deltaX,
        deltaY: previousValue.deltaY + currentValue.deltaY
    }); };
    var initialValue = {
        deltaX: 0,
        deltaY: 0
    };
    return wheelEvents.reduce(combine, initialValue);
}
//# sourceMappingURL=wheel-state.js.map