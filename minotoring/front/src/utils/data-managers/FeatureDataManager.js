import { webSocket } from './WebSocketSubscriber';

//
// featureData
//
// featureData correspond to the entire object linked to the features key in the
// raw data pulled from the server
export function buildTableProps(featureData) {
  return {
    orderedKeys: ['featureName', 'mean', 'std', 'nb_nan'],
    verboseKeyNames: {
      featureName: 'Name of the features',
      mean: 'Mean',
      std: 'Standard Deviation',
      nb_nan: 'Number of NaN',
    },
    data: buildTableData(featureData),
  };
}

//
// singleFeatureData
//
// singleFeatureData correspond to the data of a SINGLE feature inside
// featureData
// export const buildAreaPlotProps = (singleFeatureData) => {
export const buildAreaPlotProps = (singleFeatureData) => {
  const {
    train: { hist: tHist },
    predict: { hist: pHist },
  } = singleFeatureData;
  const layers = [];
  const visTrain = tHist ? hist2reactVisData(tHist) : null;
  const visPredict = pHist ? hist2reactVisData(pHist) : null;
  visTrain &&
    layers.push({
      data: visTrain,
      name: 'Train Data',
      color: 'grey',
    });
  visPredict &&
    layers.push({
      data: visPredict,
      name: 'Predict Data',
    });
  return layers;
};

export const buildScatterPlotProps = (singleFeatureData) => {
  const scatterPlotData = values2reactVisData(singleFeatureData.predict.values);
  const [outliers, regularPoints] = splitOutliers(scatterPlotData, singleFeatureData.predict.mean);
  return [
    { data: regularPoints, name: 'Regular Points' },
    { data: outliers, name: 'Outliers', color: 'red' },
  ];
};

//
// Utils
//
const splitOutliers = (data, mean) =>
  data.reduce(
    ([outliers, regularPoints], { x, y }) =>
      // TODO: of course this condition has no sense. This function has been
      // been made only to show how it could be done based on a variable in singleFeatureData
      // here, the mean
      y < 0.8 * mean || y > 1.2 * mean
        ? [[...outliers, { x, y }], regularPoints]
        : [outliers, [...regularPoints, { x, y }]],
    [[], []],
  );
const hist2reactVisData = ([Y, X]) => Y.map((y, idx) => ({ x: X[idx], y }));
const values2reactVisData = (values) => values.map((value, idx) => ({ x: idx, y: value }));
export const buildTableData = (featureData) => mapObjectItems(featureData, singleFeature2TableRow);
export const singleFeature2TableRow = (featureName, featureData) => ({
  featureName,
  ...featureData.predict,
});
export const mapObjectItems = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));
