import { isEmpty } from 'lodash';

//
// Utils
//

const partition = (array, isValid) =>
  array.reduce(
    ([pass, fail], elem, idx) =>
      isValid(array[idx], idx)
        ? [[...pass, elem], fail]
        : [pass, [...fail, elem]],
    [[], []]
  );

const partitionWithThresholds = (
  array,
  upperThreshold,
  lowerThreshold,
  siblingArrays = []
) =>
  partition(
    array,
    elem => elem.y <= upperThreshold && elem.y >= lowerThreshold,
    siblingArrays
  );

export const hist2reactVisData = ([Y, X]) =>
  Y.map((y, idx) => ({ x: X[idx], y }));
export const values2reactVisData = values =>
  values.map((value, idx) => ({ x: idx, y: value }));
export const mapObjectItems = (obj, func) =>
  Object.entries(obj).map(([key, value]) => func(key, value));
export const singleFeature2TableRow = (featureName, featureData) => ({
  featureName,
  ...featureData.predict,
});
//
// singleFeatureData
//
// singleFeatureData correspond to the data of a SINGLE feature inside
// featureData
export const buildTableData = featureData =>
  mapObjectItems(featureData, singleFeature2TableRow);

//
// featureData
//
// featureData correspond to the entire object linked to the features key in the
// raw data pulled from the server
export const buildFeatureKLTableProps = featureData => {
  return {
    data: buildTableData(featureData),
    isRowFiltrable: true,
    mainCol: 'featureName',
    orderedColumns: ['featureName', 'kl_divergence'],
    verboseColNames: {
      featureName: 'Name of the features',
      kl_divergence: 'KL Divergence',
    },
  };
};

export const buildTableProps = featureData => {
  return {
    data: buildTableData(featureData),
    mainCol: 'featureName',
    orderedColumns: [
      'featureName',
      'kl_divergence',
      'mean',
      'std',
      'nan_percentage',
      'percentile_05',
      'percentile_95',
    ],
    verboseColNames: {
      featureName: 'Feature name',
      kl_divergence: 'KL Divergence',
      mean: 'Mean',
      std: 'Standard Deviation',
      nan_percentage: '% NaN',
      percentile_05: '5th perc.',
      percentile_95: '95th perc.',
    },
  };
};

export const buildAreaPlotProps = singleFeatureData => {
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

const isHighlighted = (idx, valuesInfos, highlightedIds) => {
  return highlightedIds.has(valuesInfos.prediction.ids[idx]);
};

export const buildScatterPlotProps = (
  singleFeatureData,
  valuesInfos,
  highlightedIds
) => {
  console.log(highlightedIds);
  const scatterPlotData = values2reactVisData(singleFeatureData.predict.values);
  const [highlightedPoints, notHightlightedPoints] = partition(
    scatterPlotData,
    (_, idx) => isHighlighted(idx, valuesInfos, highlightedIds)
  );
  const lowerThreshold = singleFeatureData.predict.percentile_05;
  const upperThreshold = singleFeatureData.predict.percentile_95;
  const [regularPoints, outliers] = partitionWithThresholds(
    notHightlightedPoints,
    upperThreshold,
    lowerThreshold
  );
  console.log(highlightedPoints);
  return [
    { data: highlightedPoints, name: 'Highlighted Points', color: 'green' },
    { data: regularPoints, name: 'Regular Points' },
    { data: outliers, name: 'Outliers', color: 'red' },
  ];
};
