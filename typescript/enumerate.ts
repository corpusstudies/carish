export function enumerateValues(valueCount: number) {
  const list = [];
  for (let i = 0; i < valueCount; i += 1) {
    list.push(i);
  }
  return list;
}

export function enumerateList(itemValues: number[], count: number) {
  let result: number[][] = [[]];
  for (let itemIndex = 0; itemIndex < count; itemIndex += 1) {
    const previousResult = result;
    result = [];
    for (let previousIndex = 0; previousIndex < previousResult.length; previousIndex += 1) {
      const previousValues = previousResult[previousIndex];
      for (let valueIndex = 0; valueIndex < itemValues.length; valueIndex++) {
        const currentValue = [...previousValues, itemValues[valueIndex]];
        result.push(currentValue);
      }
    }
  }
  return result;
}
