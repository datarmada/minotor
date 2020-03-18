import { useEffect, useState } from 'react';
import { webSocket } from './WebSocketSubscriber';

export function useData() {
  const [featureData, setFeatureData] = useState({});
  const [predictionData, setPredictionData] = useState({});

  useEffect(() => {
    webSocket.subscribeToFeatureData(setFeatureData);
    webSocket.subscribeToPredictionData(setPredictionData);
  }, []);

  return { featureData, predictionData };
}

export function useFeatureData() {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    webSocket.subscribeToFeatureData(setFeatureData);
  }, []);

  return featureData;
}

export function usePredictionData() {
  const [predictionData, setPredictionData] = useState({});

  useEffect(() => {
    webSocket.subscribeToPredictionData(setPredictionData);
  }, []);

  return predictionData;
}
