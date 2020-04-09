import React, { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

// Components
import FeatureAnalyzer from '../components/feature-analytics/FeatureAnalyzer';
import InputsAnalytics from '../components/feature-analytics/InputsAnalytics';
import TrainingDataUploader from '../components/feature-analytics/TrainingDataUploader';

// Data Managers
import { buildGetFetcher } from '../utils/data-managers/DataFetcher';

// Utils
const dataSetter = async (response, setFeatureData, setHasTrainingData) => {
  const data = await response.json();
  setFeatureData(data);
  setHasTrainingData(isEmpty(data) || !isEmpty(data.valuesInfos.training.ids));
};

export default function FeaturesAnalytics() {
  const [featureData, setFeatureData] = useState({});
  const [selectedInputs, setSelectedInputs] = useState(new Set());
  const [hasTrainingData, setHasTrainingData] = useState(true);

  useEffect(() => {
    const { fetchData, abortController } = buildGetFetcher('data', dataSetter);
    fetchData(setFeatureData, setHasTrainingData);
    return () => {
      abortController.abort();
    };
  }, [hasTrainingData]);

  return (
    <div className="page">
      <h1>Features Analytics</h1>
      {!hasTrainingData ? (
        <TrainingDataUploader
          updateTrainingData={el => setHasTrainingData(el)}
        />
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
