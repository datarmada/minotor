import React, { useEffect, useState } from 'react';
import { getDataFetcher } from '../../utils/data-managers/DataFetcher';

export default function InputsAnalytics() {
  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    const dataFetcher = getDataFetcher('data', setFeatureData);
    dataFetcher(setFeatureData);
  }, []);

  return (
    <div>
      <h1>Inputs Analytics</h1>

    </div>
  );
}
