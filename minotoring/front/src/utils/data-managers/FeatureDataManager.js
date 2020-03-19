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
  const outliersData = values2reactVisData(uniqueFeatureData.predict.values);
  return [{ data: outliersData, name: 'Outliers' }];
};

// Utils
const hist2reactVisData = ([Y, X]) => Y.map((y, idx) => ({ x: X[idx], y }));
const values2reactVisData = (values) => values.map((value, idx) => ({ x: idx, y: value }));
