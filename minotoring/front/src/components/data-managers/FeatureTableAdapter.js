const mapObjectToArray = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));

const transformSingleFeature = (featureName, featureData) =>
  Object.assign({ featureName: featureName }, featureData.predict);

const transformData = rawData =>
  mapObjectToArray(rawData, transformSingleFeature);

const orderedKeys = ['featureName', 'mean', 'std', 'nb_nan'];

const verboseKeyNames = {
  featureName: 'Name of the features',
  mean: 'Mean',
  std: 'Standard Deviation',
  nb_nan: 'Number of NaN'
};

export function buildTableProps(rawData) {
  return {
    orderedKeys: orderedKeys,
    verboseKeyNames: verboseKeyNames,
    data: transformData(rawData)
  };
}
