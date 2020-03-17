export default function buildTableProps(rawData) {
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

export const transformData = rawData =>
  mapObjectItems(rawData, transformSingleFeature);

export const transformSingleFeature = (featureName, featureData) => {
  return { featureName: featureName, ...featureData.predict };
};

export const mapObjectItems = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));
