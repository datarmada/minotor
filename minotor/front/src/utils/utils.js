export const getPhaseKey = isTraining =>
  isTraining ? 'training' : 'prediction';

// Transform Python Hist format into ReactVis data
export const hist2reactVisData = ([Y, X]) =>
  Y.map((y, idx) => ({ x: X[idx], y }));

// Mapping (key, value) of an object with a function
export const mapObjectItems = (obj, func) =>
  Object.entries(obj).map(([key, value], idx) => func(key, value, idx));

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
export const values2reactVisData = (values, markSize = 4) =>
  mapObjectItems(values, (id, val, idx) => ({
    x: idx,
    y: val,
    id,
    size: markSize,
  }));
