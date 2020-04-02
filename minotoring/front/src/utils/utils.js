export const getPhaseKey = isTraining =>
  isTraining ? 'training' : 'prediction';

// Transform Python Hist format into ReactVis data
export const hist2reactVisData = ([Y, X]) =>
  Y.map((y, idx) => ({ x: X[idx], y }));

// Mapping (key, value) of an object with a function
export const mapObjectItems = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));

export const partition = (array, isValid) =>
  array.reduce(
    ([pass, fail], elem, idx) =>
      isValid(array[idx], idx)
        ? [[...pass, elem], fail]
        : [pass, [...fail, elem]],
    [[], []]
  );

export const partitionWithThresholds = (
  array,
  upperThreshold,
  lowerThreshold
) =>
  partition(
    array,
    elem => elem.y <= upperThreshold && elem.y >= lowerThreshold
  );

// Transform values into ReactVis Data
export const values2reactVisData = values =>
  values.map((value, idx) => ({ x: idx, y: value }));

// Find index of the closest element in an array
export const getClosestIndex = (arr, element) =>
  arr
    .map(val => Math.abs(val - element))
    .reduce(
      ({ lowest, lowestIdx }, next, idx) =>
        next < lowest
          ? { lowest: next, lowestIdx: idx }
          : { lowest, lowestIdx },
      { lowest: Number.POSITIVE_INFINITY, lowestIdx: -1 }
    ).lowestIdx;
