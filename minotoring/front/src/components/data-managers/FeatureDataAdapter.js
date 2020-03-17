const mapObjectToArray = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));

const transformSingleFeature = (featureName, featureData) =>
  Object.assign({ featureName: featureName }, featureData);

const transformData = rawData =>
  mapObjectToArray(rawData, transformSingleFeature);

const extractStatistics = singleFeature =>
  Object.keys(singleFeature).filter(key => key !== 'values');

const getOrderedKeys = rawData =>
  ['featureName'].concat(
    extractStatistics(Object.keys(rawData).length > 0 ? rawData[0] : {})
  );

const verboseKeyNames = {
  featureName: 'Name of the features',
  mean: 'Mean',
  std: 'Standard Deviation',
  nb_nan: 'Number of NaN'
};

export function buildTableProps(rawData) {
  return {
    orderedKeys: getOrderedKeys(rawData),
    verboseKeyNames: verboseKeyNames,
    data: transformData(rawData)
  };
}
