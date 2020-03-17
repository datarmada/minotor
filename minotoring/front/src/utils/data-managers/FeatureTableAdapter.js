export function buildTableProps(rawData) {

  return {
    orderedKeys: orderedKeys,
    verboseKeyNames: verboseKeyNames,
    data: transformData(rawData)
  };
}
const orderedKeys = ['featureName', 'mean', 'std', 'nb_nan'];

const verboseKeyNames = {
  featureName: 'Name of the features',
  mean: 'Mean',
  std: 'Standard Deviation',
  nb_nan: 'Number of NaN'
};

const transformData = rawData =>
  mapObjectItems(rawData, transformSingleFeature);

const transformSingleFeature = (featureName, featureData) =>
  Object.assign({ featureName: featureName, ...featureData.predict});

const mapObjectItems = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));
