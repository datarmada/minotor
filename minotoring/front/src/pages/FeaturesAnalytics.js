import React, { useEffect, useState } from 'react';

// Components
import FeatureAnalyzer from '../components/analyzers/FeatureAnalyzer';
import InputsAnalytics from '../components/inputs-table/InputsAnalytics';

// Data Managers
import { buildGetFetcher } from '../utils/data-managers/DataFetcher';

// Utils
const dataSetter = async (response, setFeatureData) => {
  const data = await response.json();
  setFeatureData(data);
};

export default function FeaturesAnalytics() {
  const [featureData, setFeatureData] = useState({});
  const [selectedInputs, setSelectedInputs] = useState({});

  useEffect(() => {
    const { fetchData, abortController } = buildGetFetcher('data', dataSetter);
    fetchData(setFeatureData);
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className="page">
      <h1>Features Analytics</h1>
      <FeatureAnalyzer
        onSelectedPoints={setSelectedInputs}
        featureData={featureData}
      />
      <InputsAnalytics
        featureData={featureData}
        selectedInputs={selectedInputs}
      />
    </div>
  );
}
