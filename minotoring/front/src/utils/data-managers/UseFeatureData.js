import { useEffect, useState } from 'react';
import { webSocket } from './WebSocketSubscriber';

export default function useFeatureData() {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    webSocket.subscribeToFeatureData(setFeatureData);
  }, []);

  return featureData;
}
