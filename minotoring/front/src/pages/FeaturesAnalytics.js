import React, { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

// Components
import FeatureAnalyzer from '../components/feature-analytics/FeatureAnalyzer';
import InputsAnalytics from '../components/feature-analytics/InputsAnalytics';
import TrainingDataUploader from '../components/feature-analytics/TrainingDataUploader';

// Data Managers
import { buildGetFetcher } from '../utils/data-managers/DataFetcher';

// Utils
const dataSetter = async (response, setFeatureData) => {
  const data = await response.json();
  setFeatureData(data);
};

export default function FeaturesAnalytics() {
  const [featureData, setFeatureData] = useState({});
  const [selectedInputs, setSelectedInputs] = useState(new Set());

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
      {!isEmpty(featureData) &&
      isEmpty(featureData.valuesInfos.training.ids) ? (
        <TrainingDataUploader />
      ) : null}
      <div className="card-container column">
        <div className="card-margin">
          <FeatureAnalyzer
            onSelectedPoints={setSelectedInputs}
            featureData={featureData}
          />
        </div>
        <div className="card-margin">
          <InputsAnalytics
            featureData={featureData}
            selectedInputs={selectedInputs}
          />
        </div>
      </div>
    </div>
  );
}
