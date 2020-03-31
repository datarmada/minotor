// Mapping (key, value) of an object with a function
export const mapObjectItems = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));

// Keeping data between two thresholds
export const splitOutliers = (data, upperTreshold, lowerTreshold) =>
  data.reduce(
    ([outliers, regularPoints], { x, y }) =>
      y < lowerTreshold || y > upperTreshold
        ? [[...outliers, { x, y }], regularPoints]
        : [outliers, [...regularPoints, { x, y }]],
    [[], []]
  );

// Transform Python Hist format into ReactVis data
export const hist2reactVisData = ([Y, X]) =>
  Y.map((y, idx) => ({ x: X[idx], y }));

// Transform values into ReactVis Data
export const values2reactVisData = values =>
  values.map((value, idx) => ({ x: idx, y: value }));
