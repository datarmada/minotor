import {
  hist2reactVisData,
  partition,
  partitionWithThresholds,
  values2reactVisData,
} from '../utils';

// Build props to represent histograms on an Area Plot
export const buildHistProps = singleFeatureStatistics => {
  const {
    training: { hist: tHist },
    prediction: { hist: pHist },
  } = singleFeatureStatistics;
  const layers = [];
  const visTrain = tHist ? hist2reactVisData(tHist) : null;
  const visPredict = pHist ? hist2reactVisData(pHist) : null;
  visTrain &&
    layers.push({
      data: visTrain,
      name: 'Training Data',
      color: 'grey',
    });
  visPredict &&
    layers.push({
      data: visPredict,
      name: 'Prediction Data',
    });
  return layers;
};

// Building props to represent values and outliers in a Scatter Graph
// TODO: Generalize this graph to training data as well
const isHighlighted = (idx, valuesInfos, highlightedIds) => {
  return highlightedIds.has(valuesInfos.prediction.ids[idx]);
};

export const buildScatterWithOutliersProps = (
  singleFeatureStatistics,
  valuesInfos,
  highlightedIds
) => {
  const scatterPlotData = values2reactVisData(
    singleFeatureStatistics.prediction.values
  );
  const [highlightedPoints, notHightlightedPoints] = partition(
    scatterPlotData,
    (_, idx) => isHighlighted(idx, valuesInfos, highlightedIds)
  );
  const lowerThreshold = singleFeatureStatistics.prediction.percentile05;
  const upperThreshold = singleFeatureStatistics.prediction.percentile95;
  const [regularPoints, outliers] = partitionWithThresholds(
    notHightlightedPoints,
    upperThreshold,
    lowerThreshold
  );
  return [
    { data: highlightedPoints, name: 'Highlighted Points', color: 'green' },
    { data: regularPoints, name: 'Regular Points' },
    { data: outliers, name: 'Outliers', color: 'red' },
  ];
};
