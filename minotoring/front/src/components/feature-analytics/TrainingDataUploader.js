import React from 'react';
import { buildFilePostFetcher } from '../../utils/data-managers/DataFetcher';

const sendTrainingData = trainingData => {
  const { fetchData } = buildFilePostFetcher(
    'training-data',
    () => {},
    trainingData
  );
  fetchData();
};

export default function TrainingDataUploader() {
  return (
    <div>
      <p>
        You have no training data. Upload training data so you can compare them
        with prediction data.
      </p>
      <input
        type="file"
        onChange={e => {
          sendTrainingData(e.target.value);
        }}
      />
    </div>
  );
}
