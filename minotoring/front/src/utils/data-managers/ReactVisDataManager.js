import { isEmpty, concat } from 'lodash';

import {
  hist2reactVisData,
  partition,
  partitionWithThresholds,
  values2reactVisData,
} from '../utils';

export const getHighlightedValuesPerPhase = (
  singleFeatureStatistics,
  valuesInfos,
  highlightedIds
) =>
  [...highlightedIds].map(id => ({
    x: singleFeatureStatistics[valuesInfos.id2phase[id]].values[id],
    id,
  }));

export const getHighlightedValues = (
  singleFeatureStatistics,
  valuesInfos,
  highlightedIds = new Set()
) => {
  const maxValues = Math.max(
    ...(singleFeatureStatistics.prediction.hist
      ? singleFeatureStatistics.prediction.hist[0]
      : []),
    ...(singleFeatureStatistics.training.hist
      ? singleFeatureStatistics.training.hist[0]
      : [])
  );
  return concat(
    ...[true, false].map(boolean =>
      getHighlightedValuesPerPhase(
        singleFeatureStatistics,
        valuesInfos,
        highlightedIds,
        boolean
      )
    )
  ).map(({ x }) => ({
    x,
    y: maxValues,
  }));
};

// Build props to represent histograms on an Area Plot
export const buildHistProps = (
  singleFeatureStatistics,
  valuesInfos,
  highlightedIds
) => {
  const {
    training: { hist: tHist },
    prediction: { hist: pHist },
  } = singleFeatureStatistics;
  const layers = [];
  const visTrain = tHist ? hist2reactVisData(tHist) : null;
  const visPredict = pHist ? hist2reactVisData(pHist) : null;
  const visHighlighted = !isEmpty(highlightedIds)
    ? getHighlightedValues(singleFeatureStatistics, valuesInfos, highlightedIds)
    : null;

  visTrain &&
    layers.push({
      data: visTrain,
      name: 'Training Data',
      color: 'var(--charts-flat-color)',
      style: {
        stroke: 'var(--charts-flat-color)',
        strokeWidth: 2,
        fillOpacity: 0.2,
      },
    });
  visPredict &&
    layers.push({
      data: visPredict,
      name: 'Prediction Data',
      color: 'var(--charts-main-bright-color)',
      style: {
        stroke: 'var(--charts-main-bright-color)',
        strokeWidth: 2,
        fillOpacity: 0.2,
      },
    });
  visHighlighted &&
    layers.push({
      data: visHighlighted,
      name: 'Highlighted Data',
      color: 'var(--charts-highlighting-bright-color)',
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
  highlightedIds = new Set()
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
  const layers = [];

  !isEmpty(regularPoints) &&
    layers.push({
      color: 'var(--charts-main-bright-color)',
      data: regularPoints,
      name: 'Prediction data',
      opacity: 0.8,
    });
  !isEmpty(outliers) &&
    layers.push({
      color: 'var(--charts-outliers-color)',
      data: outliers,
      name: 'Outliers',
      opacity: 0.8,
    });
  !isEmpty(highlightedPoints) &&
    layers.push({
      color: 'var(--charts-highlighting-bright-color)',
      data: highlightedPoints.map(props => ({ ...props, size: 10 })),
      name: 'Highlighted Points',
      opacity: 1,
    });
  return layers;
};
