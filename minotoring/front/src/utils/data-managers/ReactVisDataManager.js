import { isEmpty, concat } from 'lodash';

import {
  hist2reactVisData,
  partition,
  partitionWithThresholds,
  values2reactVisData,
  getPhaseKey,
  getClosestIndex,
} from '../utils';

export const getClosestHistValue = (singleFeatureStatistics, x, isTraining) => {
  const [
    { lowestIdx, lowestDiff },
    { lowestIdx: secondLowestIdx, lowestDiff: secondLowestDiff },
  ] = getClosestIndex(
    singleFeatureStatistics[getPhaseKey(isTraining)].hist[1],
    x
  );
  return (
    (secondLowestDiff / (lowestDiff + secondLowestDiff)) *
      singleFeatureStatistics[getPhaseKey(isTraining)].hist[0][lowestIdx] +
    (lowestDiff / (lowestDiff + secondLowestDiff)) *
      singleFeatureStatistics[getPhaseKey(isTraining)].hist[0][secondLowestIdx]
  );
};

export const getHighlightedValuesPerPhase = (
  singleFeatureStatistics,
  valuesInfos,
  highlightedIds,
  isTraining
) =>
  valuesInfos[getPhaseKey(isTraining)].ids.reduce(
    (arr, id, idx) =>
      highlightedIds.has(id)
        ? [
            ...arr,
            {
              x: singleFeatureStatistics[getPhaseKey(isTraining)].values[idx],
              id,
              isTraining,
            },
          ]
        : arr,
    []
  );

export const getHighlightedValues = (
  singleFeatureStatistics,
  valuesInfos,
  highlightedIds = new Set()
) =>
  concat(
    ...[true, false].map(boolean =>
      getHighlightedValuesPerPhase(
        singleFeatureStatistics,
        valuesInfos,
        highlightedIds,
        boolean
      )
    )
  ).map(({ x, isTraining }) => ({
    x,
    isTraining,
    y: getClosestHistValue(singleFeatureStatistics, x, isTraining),
  }));

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
      color: 'grey',
    });
  visPredict &&
    layers.push({
      data: visPredict,
      name: 'Prediction Data',
    });
  visHighlighted &&
    layers.push({
      data: visHighlighted,
      name: 'Highlighted Data',
      color: 'green',
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
    layers.push({ data: regularPoints, name: 'Regular Points' });
  !isEmpty(outliers) &&
    layers.push({ data: outliers, name: 'Outliers', color: 'red' });
  !isEmpty(highlightedPoints) &&
    layers.push({
      data: highlightedPoints,
      name: 'Highlighted Points',
      color: 'green',
    });
  return layers;
};
