var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
export function enumerateValues(valueCount) {
    var list = [];
    for (var i = 0; i < valueCount; i += 1) {
        list.push(i);
    }
    return list;
}
export function enumerateList(itemValues, count) {
    var result = [[]];
    for (var itemIndex = 0; itemIndex < count; itemIndex += 1) {
        var previousResult = result;
        result = [];
        for (var previousIndex = 0; previousIndex < previousResult.length; previousIndex += 1) {
            var previousValues = previousResult[previousIndex];
            for (var valueIndex = 0; valueIndex < itemValues.length; valueIndex++) {
                var currentValue = __spreadArray(__spreadArray([], previousValues), [itemValues[valueIndex]]);
                result.push(currentValue);
            }
        }
    }
    return result;
}
//# sourceMappingURL=enumerate.js.map