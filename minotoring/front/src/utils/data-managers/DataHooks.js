import { useEffect, useState } from 'react';
import webSocket from './WebSocketSubscriber';

export const useData = () => {
  const [featureData, setFeatureData] = useState({});
  const [predictionData, setPredictionData] = useState({});

  useEffect(() => {
    webSocket.subscribeToFeatureData(setFeatureData);
    webSocket.subscribeToPredictionData(setPredictionData);
  }, []);

  return { featureData, predictionData };
};

export const useFeatureData = () => {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    webSocket.subscribeToFeatureData(setFeatureData);
  }, []);

  return featureData;
};

export const usePredictionData = () => {
  const [predictionData, setPredictionData] = useState({});

  useEffect(() => {
    webSocket.subscribeToPredictionData(setPredictionData);
  }, []);

  return predictionData;
};
