import {
  hist2reactVisData,
  values2reactVisData,
  splitOutliers,
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
export const buildScatterWithOutliersProps = singleFeatureStatistics => {
  const scatterPlotData = values2reactVisData(
    singleFeatureStatistics.prediction.values
  );
  const [outliers, regularPoints] = splitOutliers(
    scatterPlotData,
    singleFeatureStatistics.prediction.percentile95,
    singleFeatureStatistics.prediction.percentile05
  );
  return [
    { data: regularPoints, name: 'Regular Points' },
    { data: outliers, name: 'Outliers', color: 'red' },
  ];
};
