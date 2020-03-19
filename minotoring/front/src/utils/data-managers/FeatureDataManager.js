import { useEffect, useState } from 'react';
import { webSocket } from './WebSocketSubscriber';

// Hook
export default function useFeatureData() {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    webSocket.subscribeToFeatureData(setFeatureData);
  }, []);

  return featureData;
}

// Props builders
// NOTE: uniqueFeatureData data correspond to the data of a UNIQUE feature inside
// featureData returned in the hook above
export const buildAreaPlotProps = (uniqueFeatureData) => {
  const visTrain = hist2reactVisData(uniqueFeatureData.train.hist);
  const visPredict = hist2reactVisData(uniqueFeatureData.predict.hist);
  return [
    {
      data: visTrain,
      name: 'Train Data',
      color: 'grey',
    },
    {
      data: visPredict,
      name: 'Predict Data',
    },
  ];
};

export const buildScatterPlotProps = (uniqueFeatureData) => {
  const scatterPlotData = values2reactVisData(uniqueFeatureData.predict.values);
  const [outliers, regularPoints] = splitOutliers(scatterPlotData, uniqueFeatureData.predict.mean);
  return [
    { data: regularPoints, name: 'Regular Points' },
    { data: outliers, name: 'Outliers', color: 'red' },
  ];
};

// Utils
const splitOutliers = (data, mean) =>
  data.reduce(
    ([outliers, regularPoints], { x, y }) =>
      // TODO: of course this condition has no sense. This function has been
      // been made only to show how it could be done based on a variable in uniqueFeatureData
      // here, the mean
      y < 0.8 * mean || y > 1.2 * mean
        ? [[...outliers, { x, y }], regularPoints]
        : [outliers, [...regularPoints, { x, y }]],
    [[], []],
  );
const hist2reactVisData = ([Y, X]) => Y.map((y, idx) => ({ x: X[idx], y }));
const values2reactVisData = (values) => values.map((value, idx) => ({ x: idx, y: value }));
